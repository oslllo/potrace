# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2020/9/10

### Changed

- Changed `potrace.trace(file, options)` ***=>*** `Potrace(file, options).trace()`.
- Changed `new potrace.Potrace()` ***=>*** `Potrace(file, options)`,
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
