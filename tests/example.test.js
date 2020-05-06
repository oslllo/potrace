const { traceExample, potracePotraceExample } = require("../example/example");

describe("traceExample()", () => {
	test("resolves", async () => {
		await expect(traceExample()).resolves.not.toThrow();
	});
});

describe("potracePotraceExample()", () => {
	test("resolves", async () => {
		await expect(potracePotraceExample()).resolves.not.toThrow();
	});
});
