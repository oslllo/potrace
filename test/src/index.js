"use strict";

const fs = require("fs-extra");
const { path2 } = require("./helper");

function prepare() {
    ["generated"].forEach((directory) => {
        fs.emptyDirSync(path2[directory]);
    });
}

module.exports = {
    prepare: prepare,
};
