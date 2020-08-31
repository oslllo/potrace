"use strict";

const fs = require("fs-extra");
const { path2, Potrace, assert, expect } = require("./helper");

describe("test.function", () => {
    var sample = {
        parameters: {
            turnpolicy: Potrace.Potrace.TURNPOLICY_RIGHT,
            turdsize: 5,
            optcurve: false,
            alphamax: 3,
            opttolerance: 1,
            svgSize: 2.5,
        },
    };
    var image = {
        path: path2["svg.images.fg"][0],
        buffer: fs.readFileSync(path2["svg.images.fg"][0]),
    };
    describe("Potrace.trace()", () => {
        it("resolves with valid image buffer", () => {
            return Potrace.trace(image.buffer);
        });
        it("resolves with valid image path", () => {
            return Potrace.trace(image.path);
        });
        it("rejects with invalid argument data", async () => {
            await expect(Potrace.trace(123)).to.be.rejectedWith();
        });
        it("can set parameters", async () => {
            await Potrace.trace(image.buffer, sample.parameters);
            var info = Potrace.cb.trace.potrace.info;
            delete info["isReady"];
            assert.deepEqual(info, sample.parameters);
        });
    });
});
