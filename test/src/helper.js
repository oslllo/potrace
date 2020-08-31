"use strict";

const path = require("path");
const fg = require("fast-glob");
const Potrace = require("../../");
const { assert, expect } = require("chai").use(require("chai-as-promised"));

const path2 = {
    generated: "test/assets/generated",
    svg: "test/assets/svg",
    "svg.images": "test/assets/svg/images",
    "svg.images.fg": fg.sync(path.join("test/assets/svg/images", "*.png")),
    "svg.expected": "test/assets/svg/expected",
    "svg.expected.fg": fg.sync(path.join("test/assets/svg/expected", "*.svg")),
};

module.exports = {
    path2: path2,
    expect: expect,
    assert: assert,
    Potrace: Potrace,
};
