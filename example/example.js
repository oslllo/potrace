const potrace = require("..");
const fs = require("fs-extra");
const path = require("path");
const sharp = require("sharp");

const SOURCE_IMAGE_PATH = path.resolve("example/tree.jpg");
const TRACED_SVG_PATH = path.resolve("example/tree.svg");

async function traceExample() {
	// Trace svg using potrace.trace()
	var tracedSvg = await potrace.trace(SOURCE_IMAGE_PATH);
	// Save svg to disk with .svg extension
	fs.writeFileSync(TRACED_SVG_PATH, tracedSvg);
	// Add white background to svg and save to disk with .png extension
	await saveAsPngToDisk(TRACED_SVG_PATH);
}

async function potracePotraceExample() {
	// Create new potrace.Potrace() class instance
	var trace = new potrace.Potrace();
	// Load image we want to trace into the instanceof
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

// Function to help us save our svg to pngs on disk
async function saveAsPngToDisk(TRACED_SVG_PATH) {
	await sharp(TRACED_SVG_PATH)
		.flatten({ background: "#fff" })
		.png()
		.toFile(path.resolve("example/tree.png"));
}

module.exports = {
    traceExample,
    potracePotraceExample,
    saveAsPngToDisk
}