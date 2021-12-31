const path = require("path");
const Potrace = require("..");
const fs = require("fs-extra");
const { svg2png, initialize } = require('svg2png-wasm');
const wasm = require.resolve('svg2png-wasm').replace(/(svg2png-wasm).*/, '$1/svg2png_wasm_bg.wasm')

const init = async () => {
    const buffer = await fs.readFile(wasm)

    await initialize(buffer)
}

let initPromise;

const draw = async (svg) => {
    initPromise = initPromise || init()
    await initPromise

    return svg2png(svg)
}

async function example1() {
    var source = path.resolve("example/tree.jpg");
    var destination = path.resolve("example/tree.svg");
    var traced = await Potrace(source).trace();
    await fs.outputFile(destination, traced);
    const png = await draw(traced)
    await fs.outputFile("example/tree.png", png);
}

async function example2() {
    var source = path.resolve("example/tree.jpg");
    var destination = path.resolve("example/tree.svg");
    var instance = Potrace(source);
    var traced = await instance.trace();
    await fs.outputFile(destination, traced);
    const png = await draw(traced)
    await fs.outputFile("example/tree.png", png);
}

module.exports = {
    example1,
    example2,
};
