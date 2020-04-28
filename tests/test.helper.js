"use strict";

const fg = require("fast-glob");
const path = require("path");

const app_root_path = path.resolve("./");
const svgs_dir = path.join(app_root_path, "tests/svgs");
const source_png_input_dir = path.join(svgs_dir, "inputs");
const expected_svg_output_dir = path.join(svgs_dir, "outputs");
const source_pngs = fg.sync(path.join(source_png_input_dir, "*.png"));
const expected_svgs = fg.sync(path.join(expected_svg_output_dir, "*.svg"));

function helper(arg) {
	var _helpers = {
		"app.root.path": app_root_path,
		"svgs.dir": svgs_dir,
		"source.png.input.dir": source_png_input_dir,
		"expected.svg.output.dir": expected_svg_output_dir,
		"source.pngs": source_pngs,
		"expected.svgs": expected_svgs,
	};
	return _helpers[arg];
}

module.exports = helper;
