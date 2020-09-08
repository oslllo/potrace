"use strict";

const fs = require("fs-extra");
const { path2, Potrace, assert, expect, constants } = require("./helper");

describe("test.function", () => {
    var sample = {
        parameters: {
            turnpolicy: constants.TURNPOLICY_RIGHT,
            turdsize: 5,
            optcurve: false,
            alphamax: 3,
            opttolerance: 1,
            opt_type: undefined,
            svgSize: 2.5,
        },
    };
    var image = {
        path: path2["svg.images.fg"][0],
        buffer: fs.readFileSync(path2["svg.images.fg"][0]),
    };
    describe("Potrace.trace()", () => {
        it("resolves with valid image buffer", () => {
            return Potrace(image.buffer).trace();
        });
        it("resolves with valid image path", () => {
            return Potrace(image.path).trace();
        });
        it("rejects with invalid argument data", async () => {
            await expect(Potrace(123).trace()).to.be.rejectedWith();
        });
        it("can set parameters", async () => {
            var potrace = Potrace(image.buffer, sample.parameters);
            var info = potrace.options.all();
            delete info["isReady"];
            assert.deepEqual(info, sample.parameters);
        });
    });
});
