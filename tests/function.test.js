'use strict';

const potrace = require("../src");
const fg = require("fast-glob");
const path = require("path");
const fs = require("fs-extra");
const helper = require("./test.helper");

const source_pngs = helper("source.pngs");
const expected_svgs = helper("expected.svgs");

describe("Funtion", () => {
	var _potrace = new potrace.Potrace();
	var _image_path = source_pngs[0];
	var _image_buffer = fs.readFileSync(_image_path);
	test("resolves with valid image buffer", async () => {
		await expect(_potrace.loadImage(_image_buffer)).resolves.not.toThrow();
		await expect(_potrace.loadImageFromBuffer(_image_buffer)).resolves.not.toThrow();
    });
    test("resolves with valid image path", async () => {
        await expect(_potrace.loadImage(_image_path)).resolves.not.toThrow();
		await expect(_potrace.loadImageFromPath(_image_path)).resolves.not.toThrow();
    });
    test("rejects with invalid image argument type", async () => {
        await expect(_potrace.loadImage(123)).rejects.not.toThrow();
        await expect(_potrace.loadImageFromPath(123)).rejects.not.toThrow();
		await expect(_potrace.loadImageFromBuffer(123)).rejects.not.toThrow();
    });
});
