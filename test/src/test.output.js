"use strict";

const fs = require("fs-extra");
const { path2, Potrace, assert } = require("./helper");

describe("test.output", () => {
    describe("potrace.trace()", () => {
        path2["svg.images.fg"].forEach((image, index) => {
            it(`returns correct SVG data for source image ${image}`, async () => {
                var svg = await Potrace(image).trace();
                var expected = fs.readFileSync(path2["svg.expected.fg"][index], "utf-8");
                assert.equal(svg, expected);
            });
        });
    });
});
