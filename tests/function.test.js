"use strict";

const potrace = require("../src");
const fg = require("fast-glob");
const path = require("path");
const fs = require("fs-extra");
const helper = require("./test.helper");

const source_pngs = helper("source.pngs");
const expected_svgs = helper("expected.svgs");

var _potrace;
var _image_path;
var _image_buffer;
var _test_parameters;

beforeAll(() => {
	_potrace = new potrace.Potrace();
	_image_path = source_pngs[0];
	_image_buffer = fs.readFileSync(_image_path);
	_test_parameters = {
		turnpolicy: potrace.Potrace.TURNPOLICY_RIGHT,
		turdsize: 5,
		optcurve: false,
		alphamax: 3,
		opttolerance: 1,
	};
});

describe("potrace.trace()", () => {
	test("resolves with valid image buffer", async () => {
		await expect(potrace.trace(_image_buffer)).resolves.not.toThrow();
	});
	test("resolves with valid image path", async () => {
		await expect(potrace.trace(_image_path)).resolves.not.toThrow();
	});
	test("rejects with invalid argument data", async () => {
		await expect(potrace.trace(123)).rejects.not.toThrow();
  });
  test("can set parameters", async () => {
		await potrace.trace(_image_buffer, _test_parameters);
		var _info = potrace.cb.trace.potrace.info;
		expect(_info.turnpolicy).toBe(_test_parameters.turnpolicy);
		expect(_info.turdsize).toBe(_test_parameters.turdsize);
		expect(_info.optcurve).toBe(_test_parameters.optcurve);
		expect(_info.alphamax).toBe(_test_parameters.alphamax);
		expect(_info.opttolerance).toBe(_test_parameters.opttolerance);
	});
});

describe("potrace.loadImage()", () => {
	test("resolves with valid image buffer", async () => {
		await expect(_potrace.loadImage(_image_buffer)).resolves.not.toThrow();
	});
	test("resolves with valid image path", async () => {
		await expect(_potrace.loadImage(_image_path)).resolves.not.toThrow();
	});
	test("rejects with invalid argument data", async () => {
		await expect(_potrace.loadImage(123)).rejects.not.toThrow();
	});
});

describe("potrace.loadImageFromBuffer()", () => {
	test("resolves with valid image buffer", async () => {
		await expect(
			_potrace.loadImageFromBuffer(_image_buffer)
		).resolves.not.toThrow();
	});
	test("rejects with invalid image argument type", async () => {
		await expect(_potrace.loadImageFromBuffer(123)).rejects.not.toThrow();
	});
});

describe("potrace.loadImageFromPath()", () => {
	test("resolves with valid image path", async () => {
		await expect(
			_potrace.loadImageFromPath(_image_path)
		).resolves.not.toThrow();
	});
	test("rejects with invalid image argument type", async () => {
		await expect(_potrace.loadImageFromPath(123)).rejects.not.toThrow();
	});
});

describe("potrace.setParameter()", () => {
	test("can set parameters", async () => {
		var _p = new potrace.Potrace();
		_p.setParameter(_test_parameters);
		var _info = _p.info;
		expect(_info.turnpolicy).toBe(_test_parameters.turnpolicy);
		expect(_info.turdsize).toBe(_test_parameters.turdsize);
		expect(_info.optcurve).toBe(_test_parameters.optcurve);
		expect(_info.alphamax).toBe(_test_parameters.alphamax);
		expect(_info.opttolerance).toBe(_test_parameters.opttolerance);
	});
});
