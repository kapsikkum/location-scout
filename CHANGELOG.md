# Changelog

## [0.4.0](https://github.com/kapsikkum/location-scout/compare/v0.3.0...v0.4.0) (2026-09-30)


### Features

* add rolling routes ([43bd9bd](https://github.com/kapsikkum/location-scout/commit/43bd9bd3521a44a080ad7d2f8a51d3c25955e2b1))
* aircraft type, operator and route from adsbdb in plane popups ([bc2c652](https://github.com/kapsikkum/location-scout/commit/bc2c65253951c82e2da54cebf294501fd942aab7))
* lens advisor from Commons EXIF and your own photos ([b1474d5](https://github.com/kapsikkum/location-scout/commit/b1474d5196894ac2802b54ef5c378828e2627fbb))
* NSW live traffic cameras layer ([db2a227](https://github.com/kapsikkum/location-scout/commit/db2a2275bec0ea0d671261d4a5ba7d68a528b91a))
* NSW RFS fire incidents layer and aurora (Kp) alert ([9413d62](https://github.com/kapsikkum/location-scout/commit/9413d6292ed36c2de65b55f4482eb66d738d8eee))
* **server:** merge adsb.fi with the planes feed ([43ce656](https://github.com/kapsikkum/location-scout/commit/43ce656a4c9f24a3259dd342c40cfca4f12e6707))
* tides and swell for coastal spots in Plan shoot ([348e646](https://github.com/kapsikkum/location-scout/commit/348e646bdf15bade44b378e2552c3745261f167c))
* **web:** 44px touch targets, scrolling settings tabs, menu item names ([458f03a](https://github.com/kapsikkum/location-scout/commit/458f03a5030f2b2bb7cb9fdef99c630736a42573))
* **web:** camera icon and facing cone for traffic cameras ([2957dee](https://github.com/kapsikkum/location-scout/commit/2957dee0ba41bc28be766f52f208ff64e786cb3b))
* **web:** grouped map menus ([070d546](https://github.com/kapsikkum/location-scout/commit/070d546945607a0f5c73c7c49f7d1a268044a8ea))
* **web:** home button in the map controls ([91545a2](https://github.com/kapsikkum/location-scout/commit/91545a2ac6c339877cb338b4aaf97e9e0f705e46))
* **web:** merge legend rows and share swatches with map chips ([286260a](https://github.com/kapsikkum/location-scout/commit/286260a6cc5f3ef3c4d83f2e2a16025d3b48ec45))
* **web:** Milky Way core windows in Plan shoot and TimeBar ([d4d42f9](https://github.com/kapsikkum/location-scout/commit/d4d42f93522d250d314fbe8950a1fd3a603eee25))
* **web:** Overture Maps buildings instead of the base map's ([4d42a0a](https://github.com/kapsikkum/location-scout/commit/4d42a0ad769d2bba071c6e030e57a189426a8050))
* **web:** phone bottom sheet that keeps the route in view ([41cd53e](https://github.com/kapsikkum/location-scout/commit/41cd53ea763b340afe3b53c7daad79fe6c6fd13f))
* **web:** phone layout for map chrome ([64280d6](https://github.com/kapsikkum/location-scout/commit/64280d6be91a20eecf70d905198c6389064fae34))
* **web:** road quality map layer from OSM ([142a87e](https://github.com/kapsikkum/location-scout/commit/142a87e76460f0d7826d04bf2b95e30fa825aa99))
* **web:** route planner stops, undo/redo and road following ([171c450](https://github.com/kapsikkum/location-scout/commit/171c45021d49bfd1ed29bffe5daeb22cbd30e6e4))
* **web:** smooth travelling comet on routes ([23cf065](https://github.com/kapsikkum/location-scout/commit/23cf065cb7f6971fb862840e4f3a85894c20cbb3))
* **web:** snap-to-roads toggle for route drawing ([4d5ae4a](https://github.com/kapsikkum/location-scout/commit/4d5ae4ae1e76be8dfe8f070efef50301d8308afb))
* **web:** sun-behind-ridge line in Plan shoot, night lights overlay ([36c03ad](https://github.com/kapsikkum/location-scout/commit/36c03ad472f736862c3e372ccf935dd55f584d3e))
* **web:** sunset/sunrise burn score in Plan shoot ([f3c0551](https://github.com/kapsikkum/location-scout/commit/f3c05512522550ed0f852efc71ad9dac6bc89884))
* **web:** tap a traffic camera image to view it full screen ([c1fe1ef](https://github.com/kapsikkum/location-scout/commit/c1fe1ef69d2c5f792a226bd1c78b5492baf76121))
* **web:** weather-aware 3D sky and one cursor rule ([0891acb](https://github.com/kapsikkum/location-scout/commit/0891acbac5b8b6f4fb8d5d7be38b3c8eca4b5a72))


### Bug Fixes

* **server:** descriptive Overpass User-Agent ([869e1e6](https://github.com/kapsikkum/location-scout/commit/869e1e6f220c92e17abb1bd241d38bbd2dea96d8))
* **server:** don't show NSW TrainLink coaches as trains ([12538d8](https://github.com/kapsikkum/location-scout/commit/12538d801e36cb1f76eabe7606b49549f4cabd24))
* **server:** road cells give up on Overpass within 20s ([e2f88b8](https://github.com/kapsikkum/location-scout/commit/e2f88b84634579579a7216f70137a4097950829e))
* **web:** 3D buildings only when 3D is on ([7c1beb3](https://github.com/kapsikkum/location-scout/commit/7c1beb34643adc280f4948652ab8973fc617d0ba))
* **web:** hide night lights while the sun is up ([5af964d](https://github.com/kapsikkum/location-scout/commit/5af964dd5b149f96ce3ede54449e553a1212b6c7))
* **web:** keep Imagery, 3D and Good now as direct chips ([fe6b21b](https://github.com/kapsikkum/location-scout/commit/fe6b21b063ad0f70dd685f35192615467d5bdafc))
* **web:** keep OSM buildings, add only Overture's non-OSM ones ([39aec3a](https://github.com/kapsikkum/location-scout/commit/39aec3ad86f92135601de2b041f3c0e9e45dae0b))
* **web:** legend clears the sun-anchor bar; darker home icon ([67ab30b](https://github.com/kapsikkum/location-scout/commit/67ab30b80cda0abc15103cc8a1bec5d650212b34))
* **web:** one rail colour on the map and in the legend ([c04d9ef](https://github.com/kapsikkum/location-scout/commit/c04d9efb392e2e15a24a31b23c1c20a66fd0be1e))
* **web:** road quality layer broke map init ([ffc6368](https://github.com/kapsikkum/location-scout/commit/ffc636814a666571152eec4ae984b27f8e9b2939))
* **web:** road quality loads per cell and shows its status ([d8f416e](https://github.com/kapsikkum/location-scout/commit/d8f416ee244167aa197ef5973e2de16960db1e43))
* **web:** screen-sized camera cones ([c286fc4](https://github.com/kapsikkum/location-scout/commit/c286fc40f332fc65fdab30076f54575a13d23e26))
* **web:** static route line, direction arrows, draggable meetup point ([d19f5f2](https://github.com/kapsikkum/location-scout/commit/d19f5f2c143c231675b38d34347b629840b6408e))


### Performance Improvements

* optimize long route rendering ([e329f90](https://github.com/kapsikkum/location-scout/commit/e329f909b519040a705bdc2b3c38b1b801561246))
* **web:** cheaper 3D terrain, shadows and cursor ([cc7d978](https://github.com/kapsikkum/location-scout/commit/cc7d978872110abba7ac4ac955cc2292bbf8a441))

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
