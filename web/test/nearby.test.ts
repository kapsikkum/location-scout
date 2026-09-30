import { test } from 'node:test';
import assert from 'node:assert/strict';
import { capRows, crowdSummary, formatAltitude, formatBestWindow, formatHour, formatDelay, formatDistance, formatSpeed, planeRows, trainRows } from '../src/map/nearby.js';

const centre = { lat: -33.4, lng: 149.5 };

test('formatters', () => {
  assert.equal(formatAltitude(10_000), '3,050 m');
  assert.equal(formatAltitude('ground'), 'ground');
  assert.equal(formatAltitude(null), '–');
  assert.equal(formatSpeed(100), '185 km/h');
  assert.equal(formatSpeed(null), '–');
  assert.equal(formatDistance(3.14159), '3.1 km');
  assert.equal(formatDistance(42.6), '43 km');
  assert.equal(formatDelay(0), 'on time');
  assert.equal(formatDelay(180), '+3 min');
  assert.equal(formatDelay(-120), '-2 min');
});

test('planeRows: sorted by distance, callsign or hex fallback', () => {
  const rows = planeRows([
    { hex: 'abc123', flight: 'QFA1  ', lat: -33.0, lon: 149.5, track: 90, gs: 400, alt_baro: 30000, t: 'B738' },
    { hex: 'def456', flight: '', lat: -33.41, lon: 149.5, track: null, gs: null, alt_baro: null, t: '' },
  ], centre);
  assert.deepEqual(rows.map((r) => r.name), ['DEF456', 'QFA1']);
  assert.ok(rows[0].distKm < 2);
  assert.equal(rows[1].type, 'B738');
  assert.equal(rows[1].speed, '741 km/h');
  assert.equal(rows[1].dist, '44 km');
});

test('trainRows: title, live flag, delay, sorted', () => {
  const rows = trainRows([
    { tripId: 'b', route: 'CT1', headsign: 'Sydney', lat: -33.5, lng: 149.5, status: 'scheduled', delaySec: 0 },
    { tripId: 'a', route: 'XPT', headsign: '', lat: -33.4, lng: 149.51, status: 'live', delaySec: 300 },
  ], centre);
  assert.deepEqual(rows.map((r) => r.id), ['a', 'b']);
  assert.equal(rows[0].title, 'XPT');
  assert.equal(rows[0].live, true);
  assert.equal(rows[0].delay, '+5 min');
  assert.equal(rows[1].title, 'CT1 → Sydney');
});

test('capRows', () => {
  const r = Array.from({ length: 20 }, (_, i) => i);
  assert.equal(capRows(r, false).length, 15);
  assert.equal(capRows(r, true).length, 20);
});

test('formatHour / formatBestWindow: 12h hours, window end is to + 1', () => {
  assert.equal(formatHour(0), '12am');
  assert.equal(formatHour(7), '7am');
  assert.equal(formatHour(12), '12pm');
  assert.equal(formatHour(17), '5pm');
  assert.equal(formatHour(24), '12am');
  assert.equal(formatBestWindow({ from: 7, to: 9, label: 'Good' }), '7am–10am (good)');
  assert.equal(formatBestWindow({ from: 16, to: 16, label: '' }), '4pm–5pm');
  assert.equal(formatBestWindow(null), null);
});

test('crowdSummary: live vs typical, and plain wording when a reading is missing', () => {
  const base = { venue: 'Boundary Road Reserve', bestWindow: null };
  assert.equal(crowdSummary({ ...base, live: 40, typical: 66 }), 'Boundary Road Reserve: 40% busy now vs 66% typical');
  assert.equal(crowdSummary({ ...base, live: 40, typical: null }), 'Boundary Road Reserve: 40% busy now');
  assert.equal(crowdSummary({ ...base, live: null, typical: 66 }), 'Boundary Road Reserve: usually 66% busy at this hour (no live reading)');
  assert.equal(crowdSummary({ ...base, live: null, typical: null }), 'Boundary Road Reserve: no busyness reading right now');
  assert.equal(
    crowdSummary({ venue: 'Boundary Road Reserve', live: null, typical: 66, bestWindow: { from: 6, to: 8, label: 'Good' } }),
    'Boundary Road Reserve: usually 66% busy at this hour (no live reading) · best 6am–9am (good)',
  );
});
