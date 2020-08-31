"use strict";

const { path2, expect } = require("./helper");
const { traceExample, potracePotraceExample } = require("../../example/example");

describe("test.example", () => {
    describe("traceExample()", () => {
        it("resolves", () => {
            return traceExample();
        });
    });
    describe("potracePotraceExample()", () => {
        it("resolves", () => {
            return potracePotraceExample();
        });
    });
});
