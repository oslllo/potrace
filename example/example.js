const Potrace = require("..");
const fs = require("fs-extra");
const path = require("path");
const Svg2 = require("oslllo-svg2");

const SOURCE_IMAGE_PATH = path.resolve("example/tree.jpg");
const TRACED_SVG_PATH = path.resolve("example/tree.svg");

async function traceExample() {
    // Trace svg using potrace.trace()
    var tracedSvg = await Potrace(SOURCE_IMAGE_PATH).trace();
    // Save svg to disk with .svg extension
    fs.writeFileSync(TRACED_SVG_PATH, tracedSvg);
    // Add white background to svg and save to disk with .png extension
    await saveAsPngToDisk(TRACED_SVG_PATH);
}

async function potracePotraceExample() {
    // Create new potrace.Potrace() class instance
    var trace = Potrace(SOURCE_IMAGE_PATH);
    // Trace image and return traced svg
    var tracedSvg = await trace.trace();
    // Save svg to disk with .svg extension
    fs.writeFileSync(TRACED_SVG_PATH, tracedSvg);
    // Add white background to svg and save to disk with .png extension
    await saveAsPngToDisk(TRACED_SVG_PATH);
}

// Function to help us save our svg to pngs on disk
async function saveAsPngToDisk(TRACED_SVG_PATH) {
    await Svg2(TRACED_SVG_PATH)
        .png()
        .extend(10)
        .toFile("example/tree.png");
}

module.exports = {
    traceExample,
    potracePotraceExample,
    saveAsPngToDisk,
};
