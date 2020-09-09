"use strict";

const { path2, expect } = require("./helper");
const { example1, example2 } = require("../../example/example");

describe("test.example", () => {
    describe("example1()", () => {
        it("resolves", function () {
            this.timeout(10000);
            return example1();
        });
    });
    describe("example2()", () => {
        it("resolves", () => {
            return example2();
        });
    });
});
