# Potrace

[![Travis (.org)](https://img.shields.io/travis/oslllo/potrace?label=Travis%20CI)](https://travis-ci.org/github/oslllo/potrace)
[![npm](https://img.shields.io/npm/v/oslllo-potrace)](https://www.npmjs.com/package/oslllo-potrace)

A "1:1 output" JavaScript port of [Potrace JS](https://github.com/kilobtye/potrace) for NodeJS.

---

| **Original image**        | **Potrace output**           |
|---------------------------|------------------------------|
| ![Original Image](example/tree.jpg) | ![Potrace Output](example/tree.png) |

---

[Online Demo](http://kilobtye.github.io/potrace/)

---

## Why did I create this package ❓

[The issue](https://github.com/tooolbox/node-potrace/issues/7)

---

## Installation

```shell
npm install oslllo-potrace
```

## Usage

Taken from [Example.js](https://github.com/oslllo/potrace/tree/master/example)

#### Example Setup

```js
// Require packages
const potrace = require("oslllo-potrace");
const fs = require("fs-extra");
const path = require("path");
const sharp = require("sharp");

// Setup paths
const SOURCE_IMAGE_PATH = path.resolve("example/tree.jpg");
const TRACED_SVG_PATH = path.resolve("example/tree.svg");

// Function to help us save our svg to pngs on disk
async function saveAsPngToDisk(TRACED_SVG_PATH) {
    await sharp(TRACED_SVG_PATH)
        .flatten({ background: "#fff" })
        .png()
        .toFile(path.resolve("example/tree.png"));
}
```

#### Using `potrace.trace()`

```js
async function traceExample() {
    // Trace svg using potrace.trace()
    var tracedSvg = await potrace.trace(SOURCE_IMAGE_PATH);
    // Save svg to disk with .svg extension
    fs.writeFileSync(TRACED_SVG_PATH, tracedSvg);
    // Add white background to svg and save to disk with .png extension
    await saveAsPngToDisk(TRACED_SVG_PATH);
}
```

#### Using `new potrace.Potrace()`

```js
async function potracePotraceExample() {
    // Create new potrace.Potrace() instance
    var trace = new potrace.Potrace();
    // Load image we want to trace into the instance
    await trace.loadImage(SOURCE_IMAGE_PATH);
    // Process the image
    await trace.process();
    // Retrieve our traced svg
    tracedSvg = trace.getSVG();
    // Save svg to disk with .svg extension
    fs.writeFileSync(TRACED_SVG_PATH, tracedSvg);
    // Add white background to svg and save to disk with .png extension
    await saveAsPngToDisk(TRACED_SVG_PATH);
}
```

### Wrapper API `(potrace = require("oslllo-potrace"))`

- `potrace.trace(file, options)`: load image from `path` or `Buffer` API, process it then return its traced SVG data.

### Potrace Class API `(potrace = new potrace.Potrace())`

- `potrace.loadImage(file, options)`: load image from `path` or `Buffer` API.
- `potrace.setParameter({para1: value, ...})`: set parameters.
- `potrace.process()`: wait for the image be loaded, then run potrace algorithm. on image.
- `potrace.getSVG(size, opt_type)`: return a string of generated SVG image. ***NOTE:*** `The resulting image size` <b>=</b> `the original image size` <b>*</b> `size`. Optional parameter `opt_type` can be "curve".

### Parameters

- `turnpolicy`: how to resolve ambiguities in path decomposition. `TURNPOLICY_BLACK`, `TURNPOLICY_WHITE`, `TURNPOLICY_LEFT`, `TURNPOLICY_RIGHT`, `TURNPOLICY_MINORITY`, `TURNPOLICY_MAJORITY` **(default: TURNPOLICY_MINORITY)**.
- `turdsize`: suppress speckles of up to this size **(default: 2)**.
- `optcurve`: turn on/off curve optimization **(default: true)**.
- `alphamax`: corner threshold parameter **(default: 1)**.
- `opttolerance`: curve optimization tolerance **(default: 0.2)**.
- `svgSize`: set default svg size for `potrace.Potrace.getSVG()` **(default: 1)**.

## Changelog

Please see [CHANGELOG](https://github.com/oslllo/potrace/blob/master/CHANGELOG.md) for more information what has changed recently.

## Test

```shell
npm test
```

## Credits

[Original Potrace](http://potrace.sourceforge.net/) by Peter Selinger.

[Potrace JS Port](https://github.com/kilobtye/potrace) by @kilobtye.

[Another Potrace Port For Node.js](https://github.com/tooolbox/node-potrace) maintained by @tooolbox.

## License

The GNU General Public License v2.0 (GPL-2.0). Please see [License File](https://github.com/oslllo/potrace/blob/master/LICENSE) for more information.
