import { test } from 'node:test';
import assert from 'node:assert/strict';
import { gradeRoad, parseMaxspeed, cellsFor } from '../src/sources/roads.js';

test('gradeRoad', () => {
  assert.equal(gradeRoad({ highway: 'track', surface: 'gravel' }), 'poor');
  assert.equal(gradeRoad({ highway: 'primary', surface: 'asphalt', smoothness: 'horrible' }), 'poor');
  assert.equal(gradeRoad({ highway: 'residential', surface: 'asphalt', smoothness: 'good' }), 'good');
  assert.equal(gradeRoad({ highway: 'residential', surface: 'asphalt' }), 'fair');
  assert.equal(gradeRoad({ highway: 'residential', smoothness: 'intermediate' }), 'fair');
  assert.equal(gradeRoad({ highway: 'trunk' }), 'fair');
  assert.equal(gradeRoad({ highway: 'residential' }), 'unknown');
});

test('parseMaxspeed', () => {
  assert.equal(parseMaxspeed('80'), 80);
  assert.equal(parseMaxspeed('50 mph'), 80);
  assert.equal(parseMaxspeed('signals'), null);
  assert.equal(parseMaxspeed(undefined), null);
});

test('cellsFor snaps to the grid', () => {
  const cells = cellsFor({ south: -33.42, west: 149.58, north: -33.37, east: 149.63 });
  assert.equal(cells.length, 4);
  assert.deepEqual(cells[0], { south: -33.45, west: 149.55, north: -33.4, east: 149.6 });
});
