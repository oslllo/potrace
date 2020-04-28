const potrace = require("..");
const fs = require("fs-extra");
const path = require("path");
const sharp = require("sharp");

const source_image_path = path.resolve("example/tree.jpg");
const traced_svg_path = path.resolve("example/tree.svg");

async function example() {
	var traced_svg = await potrace.trace(source_image_path);
	fs.writeFileSync(traced_svg_path, traced_svg);
	await sharp(traced_svg_path)
		.flatten({ background: "#fff" })
		.png()
		.toFile(path.resolve("example/tree.png"));
}

async function example2() {
    var _potrace = new potrace.Potrace;
    await _potrace.loadImage(source_image_path);
    await _potrace.process();
    traced_svg = _potrace.getSVG(1);
    fs.writeFileSync(traced_svg_path, traced_svg);
    await sharp(traced_svg_path)
        .flatten({ background: "#fff" })
        .png()
        .toFile(path.resolve("example/tree.png"));
}

example();
