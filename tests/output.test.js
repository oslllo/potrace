"use strict";

const potrace = require("../src");
const fg = require("fast-glob");
const path = require("path");
const fs = require("fs-extra");
const helper = require("./test.helper");

const sourcePngs = helper("source.pngs");
const expectedSvgs = helper("expected.svgs");

var sourcePngsMaped = sourcePngs.map((png_path, index) => {
	return [png_path, index];
});

describe("potrace.trace()", () => {
	test.each(sourcePngsMaped)(
		`returns correct SVG data for source image %p`,
		async (png_path, index) => {
			var _output_svg = await potrace.trace(png_path);
			var _expected_svg = fs.readFileSync(expectedSvgs[index], "utf8");
			expect(_output_svg).toBe(_expected_svg);
		}
	);
});
