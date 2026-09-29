# Changelog

## [0.3.0](https://github.com/kapsikkum/location-scout/compare/v0.2.0...v0.3.0) (2026-09-29)


### Features

Shipped in the v0.2.0 tag but missing from its notes (merged via #11):

* **web:** Sun Anchor bearing planner on the map: place an anchor, drag the bearing, find exact sunrise/sunset alignments (#7)
* **web:** highlight base-map rail with the train overlay, and show upcoming passes on rail click (#9)
* **web:** edit place outlines on the map: drag points, click a segment to insert one (#10)
* **web:** sunlit view-from-the-spot preview on Plan shoot (#6)
* **web:** Plan shoot reorganised into Best times, The day, and Trains & planes; day chips show weather; Browse nearby replaces the Spots tab
* **web:** interactive bearing mini-map on Plan shoot with 3D terrain, buildings and satellite; wedges show where the sun rises and sets over the year
* **web:** bearing results show the year and a match grade (on the line, close, near miss, sun never reaches this bearing)

### Bug Fixes

* **web:** restore train popup contrast (#8)
* **web:** AM/PM rail pass times; timezone-independent rail pass test; edited sun bearing kept across label changes

### Documentation

* shorter README: what it does, how it works, contributing; API reference moved to docs/api.md (#14)

## [0.2.0](https://github.com/kapsikkum/location-scout/compare/v0.1.0...v0.2.0) (2026-09-28)


### Features

* atlas export takes several cities ([98d5729](https://github.com/kapsikkum/location-scout/commit/98d57291168b8d25fd420cd4b8cc1d086a19862d))
* Atlas Photo city export script ([89cedb2](https://github.com/kapsikkum/location-scout/commit/89cedb2de6af31cb22338c14a07d4703968eb084))
* phase 3 live feeds and ingestion ([dc3ec69](https://github.com/kapsikkum/location-scout/commit/dc3ec69f4138a2ff6e475d518f3b37a4cc3eeb76))
* terrain shadows, live 3D trains, plan shoot, weather, CI ([6663d51](https://github.com/kapsikkum/location-scout/commit/6663d5127e6d1a0a5da91172a8eb9a98436c0d1c))
* **web:** map and light UI (phase 2) ([e74a62d](https://github.com/kapsikkum/location-scout/commit/e74a62d647541173083c98e081b26f72ed7c0399))
* **web:** show times as 12-hour am/pm ([3260174](https://github.com/kapsikkum/location-scout/commit/3260174e1bf495bf52f58b0d1b3508134f1b5ddd))


### Bug Fixes

* tolerate a concurrent ADD COLUMN when several processes open the database ([5819a08](https://github.com/kapsikkum/location-scout/commit/5819a08599f33bdcb2fde9be1afcab9605f6eaaf))


### Performance Improvements

* building shadows in a worker, skip unchanged shadow/mood updates, grouped unions ([14d6e0b](https://github.com/kapsikkum/location-scout/commit/14d6e0b736880e6196cad285964a76a51940725c))
