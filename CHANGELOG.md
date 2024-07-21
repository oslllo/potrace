# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0](https://github.com/oslllo/potrace/compare/v2.0.1...v3.0.0) (2024-07-21)


### Bug Fixes

* fix security vulnerabilities ([cd9eee2](https://github.com/oslllo/potrace/commit/cd9eee2b38bc0aaca0dda4abb422ba5304acdc3d))

### [2.0.1](https://www.github.com/oslllo/potrace/compare/v2.0.0...v2.0.1) (2022-07-16)


### Miscellaneous Chores

* release 2.0.1 ([5eb34e2](https://www.github.com/oslllo/potrace/commit/5eb34e201a74668698ea4b27251afec5fb69e215))

## [2.0.0](https://www.github.com/oslllo/potrace/compare/v1.2.0...v2.0.0) (2021-12-31)


### Features

* **deps:** Simplify dependencies, remove canvas/jsdom ([c013c58](https://www.github.com/oslllo/potrace/commit/c013c58e0fc11c1757fbcf3089e6b42d647fb6af))


### Bug Fixes

* **deps:** use svg2png-wasm-node-10 for compatibility ([655fe37](https://www.github.com/oslllo/potrace/commit/655fe37a80bc61b62ea0a21c4346dba353154842))
* **example:** add white background ([f3b3980](https://www.github.com/oslllo/potrace/commit/f3b3980298ffed0fcc6a9e4186ac7e6a2cb0627b))


### Miscellaneous Chores

* release 2.0.0 ([6575466](https://www.github.com/oslllo/potrace/commit/6575466f0f4aeeaedb8302684c0d14903d26f350))

## [1.2.0](https://www.github.com/oslllo/potrace/compare/v1.1.4...v1.2.0) (2021-12-30)


### Features

* **potrace:** new Promise() is not needed with async function ([1adad10](https://www.github.com/oslllo/potrace/commit/1adad10ec6c0b6d19598d47faa36e64a574a756c))


### Bug Fixes

* **src:** remove unused vars ([a00c02a](https://www.github.com/oslllo/potrace/commit/a00c02a982472ea78dd74fd20c6402e093775002))
* unhandled rejection in Loader.image() ([5edf4a7](https://www.github.com/oslllo/potrace/commit/5edf4a79ed971160578003dd9c236c0ac9accf98))
* unhandled rejection in Loader.image() ([0c3843f](https://www.github.com/oslllo/potrace/commit/0c3843f078a64570043f5a046844197c86a943af))

### [1.1.4](https://www.github.com/oslllo/potrace/compare/v1.1.3...v1.1.4) (2021-09-05)


### Bug Fixes

* vulnerabilities ([e3fc7cb](https://www.github.com/oslllo/potrace/commit/e3fc7cbb39c892e08b39dc90c8ce7b869bf29ce2))

### [1.1.3](https://www.github.com/oslllo/potrace/compare/v1.1.2...v1.1.3) (2021-05-06)


### Miscellaneous Chores

* update dependencies
* release 1.1.3 ([f7784aa](https://www.github.com/oslllo/potrace/commit/f7784aae62f0132377d5f91ee6be38b63d82ddef))

## [1.1.2] - 2021/3/31

### Security

- Updated dependences.

## [1.1.1] - 2020/12/12

### Fixed

- Fixed vulnerabilities.

## [1.1.0] - 2020/9/10

### Fixed

- Added missing package `jimp` needed on runtime.

## [1.0.1] - 2020/9/10

### Changed

- Remove tests from npm `package` to help reduce unpacked `package` size.

## [1.0.0] - 2020/9/10

### Changed

- Changed `potrace.trace(file, options)` **_=>_** `Potrace(file, options).trace()`.
- Changed `new potrace.Potrace()` **_=>_** `Potrace(file, options)`,
  > The `new` declaration for `Potrace` is no more required.
- Refactored codebase.
- Updated tests.
- Moved tests from `jest` to `mocha`.
- Removed unused dependencies.

### Fixed

- Fixed base64 image throwing an error with `jsdom@16.4.0`. See [Travic CI - Build 722428515](https://travis-ci.org/github/oslllo/potrace/builds/722428515)

### Security

- Updated dependences.

## [0.0.10] - 2020/7/10

### Security

- Updated dependences.

## [0.0.9] - 2020/5/16

### Changed

- Removed unused dependences.

### Security

- Addressed advisory https://www.npmjs.com/advisories/1500.

## [0.0.8] - 2020/5/14

### Changed

- Reduced npm package size.

## [0.0.7] - 2020/5/12

### Fixed

- Fixed typo in `core.js`.

### Added

- Added badge links to `README.md`.
- Added new tags to `package.json`.

### Changed

- Updated `README.md` content.

## [0.0.6] - 2020/5/6

### Changed

- `potrace.Potrace.getSVG()` default size can now be set in parameters.
- Cleaned up tests and code.
- Updated README.md.

### Added

- Added example tests.

## [0.0.5] - 2020/4/29

### Changed

- Updated `package.json` description to match repo.

## [0.0.4] - 2020/4/29

### Fixed

- Fixed issue with `potrace.trace()` not being able to set parameters.

### Changed

- Refactored tests.
- Updated README.md.

### Added

- Added new tests.

## [0.0.3] - 2020/4/29

### Changed

- Updated README.md.

## [0.0.2] - 2020/4/28

### Changed

- Updated README.md.

## [0.0.1] - 2020/4/28

### Added

- Added everything, initial release.
