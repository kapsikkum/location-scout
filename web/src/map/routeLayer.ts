/**
 * Route map rendering: static directed line with chevron arrows.
 *
 * Layered route paint keeps routes legible over both the vector basemap and
 * satellite imagery:
 * - 'route-glow': broad translucent contrast bed.
 * - 'route-casing': crisp high-contrast outline.
 * - 'route-lines': the typed route line (sprint=solid, circuit=dashed).
 * - 'route-arrows': chevrons along the line showing the direction of travel.
 *
 * The map source 'routes' is a GeoJSON LineString FeatureCollection with one
 * Feature per route. Keeping long routes intact avoids multiplying a 1,000-point
 * route into 999 independent feature/layer evaluations.
 *
 * Vertex handles during editing are driven by the RouteEditor UI layer.
 */
import type { Map as MlMap } from 'maplibre-gl';
import { GeoJSONSource } from 'maplibre-gl';
import type { Route } from '../api.js';

export const ROUTE_LAYERS = ['route-glow', 'route-casing', 'route-lines', 'route-arrows', 'route-staging-halo', 'route-staging'] as const;

/** Layer IDs — also re-exported for clickable list and toggling. */
export const ROUTE_GLOW_LAYER = 'route-glow';
export const ROUTE_CASING_LAYER = 'route-casing';
export const ROUTE_LINE_LAYER = 'route-lines';
export const ROUTE_ARROW_LAYER = 'route-arrows';
const ROUTE_ARROW_IMAGE = 'route-arrow';
export const ROUTE_STAGING_HALO_LAYER = 'route-staging-halo';
export const ROUTE_STAGING_LAYER = 'route-staging';
export const ROUTE_SOURCE = 'routes';
export const ROUTE_STAGING_SOURCE = 'route-staging-pts';

const ROUTE_COLOR = '#f97316';   // orange-500
const ROUTE_CIRCUIT_COLOR = '#a855f7'; // purple-500
const ROUTE_CASING_DARK = '#05070f';
const ROUTE_CASING_LIGHT = '#fff7ed';

/** White chevron (pointing right) with a dark outline, drawn once as a map image. */
function arrowImage(): ImageData {
  const size = 32, c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d')!;
  g.lineCap = g.lineJoin = 'round';
  g.beginPath(); g.moveTo(10, 8); g.lineTo(21, 16); g.lineTo(10, 24);
  g.strokeStyle = ROUTE_CASING_DARK; g.lineWidth = 8; g.stroke();
  g.strokeStyle = '#ffffff'; g.lineWidth = 4; g.stroke();
  return g.getImageData(0, 0, size, size);
}

/** Add route sources and layers to an already-initialised map. */
export function initRouteLayers(map: MlMap, beforeLayer?: string) {
  const empty = (): GeoJSON.FeatureCollection => ({ type: 'FeatureCollection', features: [] });

  map.addSource(ROUTE_SOURCE, { type: 'geojson', data: empty(), lineMetrics: true });
  map.addSource(ROUTE_STAGING_SOURCE, { type: 'geojson', data: empty() });

  map.addLayer({
    id: ROUTE_GLOW_LAYER,
    type: 'line',
    source: ROUTE_SOURCE,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': ['case', ['get', 'selected'], ROUTE_CASING_LIGHT, ROUTE_CASING_DARK] as any,
      'line-width': ['case', ['get', 'selected'], 13, 10] as any,
      'line-opacity': ['case', ['get', 'selected'], 0.42, 0.28] as any,
      'line-blur': 2.8,
    },
  }, beforeLayer);

  map.addLayer({
    id: ROUTE_CASING_LAYER,
    type: 'line',
    source: ROUTE_SOURCE,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': ROUTE_CASING_DARK,
      'line-width': ['case', ['get', 'selected'], 9, 7] as any,
      'line-opacity': 0.95,
    },
  }, beforeLayer);

  // Base line — thicker sprint/circuit line.
  map.addLayer({
    id: ROUTE_LINE_LAYER,
    type: 'line',
    source: ROUTE_SOURCE,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': [
        'match', ['get', 'type'],
        'circuit', ROUTE_CIRCUIT_COLOR,
        ROUTE_COLOR,
      ] as any,
      'line-width': ['case', ['get', 'selected'], 5, 4] as any,
      'line-opacity': 1,
      'line-dasharray': ['match', ['get', 'type'], 'circuit', ['literal', [1.8, 1.1]], ['literal', [1, 0]]] as any,
    },
  }, beforeLayer);

  // Direction chevrons along the line (no text/fonts needed).
  if (!map.hasImage(ROUTE_ARROW_IMAGE)) map.addImage(ROUTE_ARROW_IMAGE, arrowImage(), { pixelRatio: 2 });
  map.addLayer({
    id: ROUTE_ARROW_LAYER,
    type: 'symbol',
    source: ROUTE_SOURCE,
    layout: {
      'symbol-placement': 'line',
      'symbol-spacing': 100,
      'icon-image': ROUTE_ARROW_IMAGE,
      'icon-size': ['case', ['get', 'selected'], 0.9, 0.7] as any,
      'icon-allow-overlap': true,
      'icon-ignore-placement': true,
      'icon-rotation-alignment': 'map',
    },
  }, beforeLayer);

  // Staging point marker: a labelled badge, separate from route vertices.
  map.addLayer({
    id: ROUTE_STAGING_HALO_LAYER,
    type: 'circle',
    source: ROUTE_STAGING_SOURCE,
    paint: {
      'circle-radius': ['case', ['get', 'selected'], 14, 12] as any,
      'circle-color': ROUTE_CASING_DARK,
      'circle-opacity': 0.88,
      'circle-stroke-color': ROUTE_CASING_LIGHT,
      'circle-stroke-width': ['case', ['get', 'selected'], 3, 2] as any,
    },
  }, beforeLayer);

  map.addLayer({
    id: ROUTE_STAGING_LAYER,
    type: 'symbol',
    source: ROUTE_STAGING_SOURCE,
    layout: {
      'text-field': 'S',
      'text-size': ['case', ['get', 'selected'], 14, 12] as any,
      'text-allow-overlap': true,
      'text-ignore-placement': true,
    },
    paint: {
      'text-color': '#fef08a',
      'text-halo-color': ROUTE_CASING_DARK,
      'text-halo-width': 2,
    },
  }, beforeLayer);
}

export function routeFeatureCollections(routes: Route[], selectedId: string | null): {
  segments: GeoJSON.FeatureCollection;
  staging: GeoJSON.FeatureCollection;
} {
  const features: GeoJSON.Feature[] = [];
  const stagingFeatures: GeoJSON.Feature[] = [];

  for (const route of routes) {
    if (route.vertices.length >= 2) {
      const coordinates = route.type === 'circuit'
        ? [...route.vertices, route.vertices[0]]
        : route.vertices;
      features.push({
        type: 'Feature',
        properties: {
          id: route.id,
          routeId: route.id,
          type: route.type,
          selected: route.id === selectedId,
        },
        geometry: { type: 'LineString', coordinates },
      });
    }

    if (route.staging) {
      stagingFeatures.push({
        type: 'Feature',
        properties: { id: route.id, routeId: route.id, selected: route.id === selectedId },
        geometry: { type: 'Point', coordinates: [route.staging.lng, route.staging.lat] },
      });
    }
  }

  return {
    segments: { type: 'FeatureCollection', features },
    staging: { type: 'FeatureCollection', features: stagingFeatures },
  };
}

/** Push a new routes FeatureCollection to the map. */
export function updateRoutes(map: MlMap, routes: Route[], selectedId: string | null) {
  const src = map.getSource(ROUTE_SOURCE) as GeoJSONSource | undefined;
  const stagSrc = map.getSource(ROUTE_STAGING_SOURCE) as GeoJSONSource | undefined;
  if (!src || !stagSrc) return;

  const { segments, staging } = routeFeatureCollections(routes, selectedId);
  src.setData(segments);
  stagSrc.setData(staging);
}
