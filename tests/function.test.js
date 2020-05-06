"use strict";

const potrace = require("../src");
const fg = require("fast-glob");
const path = require("path");
const fs = require("fs-extra");
const helper = require("./test.helper");

const source_pngs = helper("source.pngs");
const expected_svgs = helper("expected.svgs");

var trace;
var imagePath;
var imageBuffer;
var testParameters;

beforeAll(() => {
	trace = new potrace.Potrace();
	imagePath = source_pngs[0];
	imageBuffer = fs.readFileSync(imagePath);
	testParameters = {
		turnpolicy: potrace.Potrace.TURNPOLICY_RIGHT,
		turdsize: 5,
		optcurve: false,
		alphamax: 3,
		opttolerance: 1,
		svgSize: 2.5,
	};
});

describe("potrace.trace()", () => {
	test("resolves with valid image buffer", async () => {
		await expect(potrace.trace(imageBuffer)).resolves.not.toThrow();
	});
	test("resolves with valid image path", async () => {
		await expect(potrace.trace(imagePath)).resolves.not.toThrow();
	});
	test("rejects with invalid argument data", async () => {
		await expect(potrace.trace(123)).rejects.not.toThrow();
	});
	test("can set parameters", async () => {
		await potrace.trace(imageBuffer, testParameters);
		var _info = potrace.cb.trace.potrace.info;
		expect(_info.turnpolicy).toBe(testParameters.turnpolicy);
		expect(_info.turdsize).toBe(testParameters.turdsize);
		expect(_info.optcurve).toBe(testParameters.optcurve);
		expect(_info.alphamax).toBe(testParameters.alphamax);
		expect(_info.opttolerance).toBe(testParameters.opttolerance);
		expect(_info.svgSize).toBe(testParameters.svgSize);
	});
});

describe("potrace.loadImage()", () => {
	test("resolves with valid image buffer", async () => {
		await expect(trace.loadImage(imageBuffer)).resolves.not.toThrow();
	});
	test("resolves with valid image path", async () => {
		await expect(trace.loadImage(imagePath)).resolves.not.toThrow();
	});
	test("rejects with invalid argument data", async () => {
		await expect(trace.loadImage(123)).rejects.not.toThrow();
	});
});

describe("potrace.loadImageFromBuffer()", () => {
	test("resolves with valid image buffer", async () => {
		await expect(trace.loadImageFromBuffer(imageBuffer)).resolves.not.toThrow();
	});
	test("rejects with invalid image argument type", async () => {
		await expect(trace.loadImageFromBuffer(123)).rejects.not.toThrow();
	});
});

describe("potrace.loadImageFromPath()", () => {
	test("resolves with valid image path", async () => {
		await expect(trace.loadImageFromPath(imagePath)).resolves.not.toThrow();
	});
	test("rejects with invalid image argument type", async () => {
		await expect(trace.loadImageFromPath(123)).rejects.not.toThrow();
	});
});

describe("potrace.setParameter()", () => {
	test("can set parameters", async () => {
		var _p = new potrace.Potrace();
		_p.setParameter(testParameters);
		var _info = _p.info;
		expect(_info.turnpolicy).toBe(testParameters.turnpolicy);
		expect(_info.turdsize).toBe(testParameters.turdsize);
		expect(_info.optcurve).toBe(testParameters.optcurve);
		expect(_info.alphamax).toBe(testParameters.alphamax);
		expect(_info.opttolerance).toBe(testParameters.opttolerance);
	});
});
