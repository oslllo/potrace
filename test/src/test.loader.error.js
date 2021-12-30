"use strict";

const { Potrace, assert } = require("./helper");

describe("test.loader.error", () => {
    describe("new Potrace(404)", () => {
        it(`throws if loader error`, async () => {
            let error = null

            try {
                const image = `./404-not-found.png`
                await Potrace(image).trace();
            } catch (e) {
                error = e
            }

            assert(error, 'Error should be caught when loader.image() throws')
        });
    });
});
