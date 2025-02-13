# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.2.1](https://github.com/kaotypr/sicepat-eventbus/compare/v0.2.0...v0.2.1) (2025-02-13)


### Bug Fixes

* **eventbus:** use arrow function for eventbus classes methods, properly bound methods ([7f5a973](https://github.com/kaotypr/sicepat-eventbus/commit/7f5a973c82883b0f116d08bc1198fc5ac03baf3b))

## [0.2.0](https://github.com/kaotypr/sicepat-eventbus/compare/v0.1.0...v0.2.0) (2025-02-13)


### Features

* **eventbus:** eventbus-global ([dfb5863](https://github.com/kaotypr/sicepat-eventbus/commit/dfb5863440e5a6a4656bdc47a7680c9a5e39a32a))
* **eventbus:** inject eventType inside payload for every emit ([ebfa8a3](https://github.com/kaotypr/sicepat-eventbus/commit/ebfa8a3049eadf288ed7a45ad77e8103840fc43a))


### Bug Fixes

* **eventbus:** typo on omit delimiter from options type ([0568135](https://github.com/kaotypr/sicepat-eventbus/commit/05681355a548cec39d6f0ec896af59908c4604cd))
* hooks options delimiter shouldn't be configurable ([c245431](https://github.com/kaotypr/sicepat-eventbus/commit/c2454315185f0f1405c162c09e71d7920b5bfd55))
* **types:** all event payload should not be a nullish type ([34688d4](https://github.com/kaotypr/sicepat-eventbus/commit/34688d40ecd337a149a26804b26ba33136cd723c))

## 0.1.0 (2025-02-13)


### Features

* custom event effect hooks and custom emit for handling non-typesafe events ([0ffccc5](https://github.com/kaotypr/sicepat-eventbus/commit/0ffccc5d9e96a9d614db438fcde3549b4f3e0c70))
* define all supported events types and its payload ([ef32c3c](https://github.com/kaotypr/sicepat-eventbus/commit/ef32c3cefad23738d1bb95bf5f857524bb5473ee))
* eventbust container & client ([98f492f](https://github.com/kaotypr/sicepat-eventbus/commit/98f492f821f40349dcd59d99a630ca77fda9f57e))
* hooks emitEvent use EmitEventPayload type ([2913b5f](https://github.com/kaotypr/sicepat-eventbus/commit/2913b5f8b07aff50045f353f62b46186268b19f8))
* passing "eventType" in every event payload ([870528d](https://github.com/kaotypr/sicepat-eventbus/commit/870528d17274a4a530a2cec7c38bffbe2b9e5c67))
* use-eventbus hooks ([0c4eb3f](https://github.com/kaotypr/sicepat-eventbus/commit/0c4eb3f5211eed63d8b91ad9819ec15b497a16db))


### Bug Fixes

* **hooks:** iframe ref object allow null on defining hook ([02358bb](https://github.com/kaotypr/sicepat-eventbus/commit/02358bbf62b03789a4890e81ba6a2f227f45ac85))
