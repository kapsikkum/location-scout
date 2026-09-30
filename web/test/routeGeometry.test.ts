import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildRouteSegments,
  routePlanAnchor,
  type RouteType,
  osrmLegCoords,
} from '../src/map/routeGeometry.js';

// --- Segment construction ---

test('buildRouteSegments: sprint produces N-1 ordered segments', () => {
  const v: [number, number][] = [[0, 0], [1, 0], [2, 1]];
  const segs = buildRouteSegments(v, 'sprint');
  assert.equal(segs.length, 2);
  assert.deepEqual(segs[0], [[0, 0], [1, 0]]);
  assert.deepEqual(segs[1], [[1, 0], [2, 1]]);
});

test('buildRouteSegments: circuit appends closing leg last→first', () => {
  const v: [number, number][] = [[0, 0], [1, 0], [1, 1]];
  const segs = buildRouteSegments(v, 'circuit');
  assert.equal(segs.length, 3);
  assert.deepEqual(segs[2], [[1, 1], [0, 0]]);
});

test('buildRouteSegments: circuit with 2 points closes back', () => {
  const v: [number, number][] = [[0, 0], [1, 1]];
  const segs = buildRouteSegments(v, 'circuit');
  assert.equal(segs.length, 2);
  assert.deepEqual(segs[1], [[1, 1], [0, 0]]);
});

test('buildRouteSegments: sprint with 1 vertex has zero segments', () => {
  assert.equal(buildRouteSegments([[0, 0]], 'sprint').length, 0);
});

test('buildRouteSegments: empty array yields no segments for either type', () => {
  assert.equal(buildRouteSegments([], 'sprint').length, 0);
  assert.equal(buildRouteSegments([], 'circuit').length, 0);
});

test('buildRouteSegments: circuit with 1 vertex yields no segments', () => {
  assert.equal(buildRouteSegments([[0, 0]], 'circuit').length, 0);
});

// --- Plan Shoot anchor ---

test('routePlanAnchor: prefers staging over first vertex', () => {
  const anchor = routePlanAnchor(
    [[151.2, -33.8], [151.3, -33.7]],
    { lat: -33.9, lng: 151.1 },
  );
  assert.deepEqual(anchor, { lat: -33.9, lng: 151.1 });
});

test('routePlanAnchor: falls back to first vertex lng/lat when no staging', () => {
  const anchor = routePlanAnchor([[151.2, -33.8], [151.3, -33.7]], null);
  // vertex is [lng, lat], anchor must be { lat, lng }
  assert.deepEqual(anchor, { lat: -33.8, lng: 151.2 });
});

test('routePlanAnchor: returns null with no staging and no vertices', () => {
  assert.equal(routePlanAnchor([], null), null);
});

test('routePlanAnchor: staging null with no vertices returns null', () => {
  assert.equal(routePlanAnchor([], null), null);
});

test('osrmLegCoords: road path without its start; null when routing failed', () => {
  assert.deepEqual(osrmLegCoords({ code: 'Ok', routes: [{ geometry: { coordinates: [[1, 1], [1.5, 1], [2, 2]] } }] }), [[1.5, 1], [2, 2]]);
  assert.equal(osrmLegCoords({ code: 'NoRoute', routes: [] }), null);
  assert.equal(osrmLegCoords(null), null);
});

test('undoClick: removes the last snapped leg whole, or one point without snapping', async () => {
  const { undoClick } = await import('../src/components/RouteEditor.js');
  const v = (n: number) => Array.from({ length: n }, (_, i) => [i, i] as [number, number]);
  assert.deepEqual(undoClick({ vertices: v(5), clickEnds: [1, 5] }), { vertices: v(1), clickEnds: [1] });
  assert.deepEqual(undoClick({ vertices: v(1), clickEnds: [1] }), { vertices: [], clickEnds: [] });
  assert.deepEqual(undoClick({ vertices: v(3) }), { vertices: v(2), clickEnds: [] });
});
