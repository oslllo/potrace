'use strict';

const potrace = require("../src");
const fg = require("fast-glob");
const path = require("path");
const fs = require("fs-extra");
const fs2 = require("fs-extra");
const helper = require("./test.helper");

const source_pngs = helper("source.pngs");
const expected_svgs = helper("expected.svgs");

describe("Output", () => {
	var _source_pngs = source_pngs.map((png_path, index) => {
		return [png_path, index];
	});
	test.each(_source_pngs)(
		`returns correct SVG data for source image %p`,
		async (png_path, index) => {
			var _output_svg = await potrace.trace(png_path);
			var _expected_svg = fs.readFileSync(expected_svgs[index], "utf8");
			expect(_output_svg).toBe(_expected_svg);
		}
	);
});
