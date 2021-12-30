"use strict";

const fs = require("fs-extra");
const { path2 } = require("./helper");

function prepare() {
    ["generated"].forEach((directory) => {
        fs.emptyDirSync(path2[directory]);
    });

    /*
     * Throw when hit unhandledRejection, see:
     * https://github.com/mochajs/mocha/issues/2640#issuecomment-789615757
     */
    process.on('unhandledRejection', (reason) => {
        throw reason;
    });
}

module.exports = {
    prepare: prepare,
};
