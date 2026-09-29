/** Overture Maps buildings (PMTiles): far more footprints and heights than the base map's OSM buildings in regional NSW. */
import { addProtocol, type Map as MlMap, type FilterSpecification, type VectorTileSource } from 'maplibre-gl';
import { Protocol } from 'pmtiles';

const STAC = 'https://stac.overturemaps.org/catalog.json';
const PINNED = '2026-09-23.0'; // used until the catalog answers; old releases are removed after a while
export const overtureBuildingsUrl = (release: string) => `pmtiles://https://tiles.overturemaps.org/${release}/buildings.pmtiles`;

/** Newest release id among the STAC catalog's children ("2026-09-23.0"), or null. */
export function latestRelease(catalog: { links?: { rel?: string; href?: string }[] }): string | null {
  const ids = (catalog.links ?? []).filter((l) => l.rel === 'child').map((l) => /\/(\d{4}-\d{2}-\d{2}\.\d+)\/catalog\.json$/.exec(l.href ?? '')?.[1]).filter((id): id is string => !!id);
  return ids.sort().at(-1) ?? null;
}

/** Height in metres: Overture's height, else floors × 3 m, else 4 m. */
export const HEIGHT = ['coalesce', ['get', 'height'], ['*', ['get', 'num_floors'], 3], 4] as const;
const ABOVE_GROUND: FilterSpecification = ['!=', ['get', 'is_underground'], true];

let registered = false;

/** Swap the base style's building layers for Overture's, in the same place in the stack and with the same paint. */
export function useOvertureBuildings(map: MlMap) {
  const layers = map.getStyle().layers ?? [];
  const base = layers.filter((l) => 'source-layer' in l && l['source-layer'] === 'building');
  if (!base.length) return;
  if (!registered) { addProtocol('pmtiles', new Protocol().tile); registered = true; }
  map.addSource('overture', { type: 'vector', url: overtureBuildingsUrl(PINNED), attribution: '© <a href="https://overturemaps.org">Overture Maps</a>' });
  for (const l of base) {
    const at = layers.indexOf(l), before = layers[at + 1]?.id;
    map.removeLayer(l.id);
    const common = { id: l.id, source: 'overture', 'source-layer': 'building', minzoom: l.minzoom, filter: ABOVE_GROUND };
    if (l.type === 'fill-extrusion') {
      map.addLayer({ ...common, type: 'fill-extrusion', paint: { ...l.paint, 'fill-extrusion-height': HEIGHT as never, 'fill-extrusion-base': ['coalesce', ['get', 'min_height'], 0] } }, before);
    } else if (l.type === 'fill') {
      map.addLayer({ ...common, type: 'fill', paint: l.paint }, before);
    }
  }
  fetch(STAC).then((r) => r.json()).then((c) => {
    const rel = latestRelease(c);
    if (rel && rel !== PINNED) (map.getSource('overture') as VectorTileSource | undefined)?.setUrl(overtureBuildingsUrl(rel));
  }).catch(() => { /* keep the pinned release */ });
}
