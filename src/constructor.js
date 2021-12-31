"use strict";

const Svg = require("./svg");
const Loader = require("./loader");
const Option = require("./option");
const Processor = require("./processor");
const constants = require("./constants");

const Potrace = function (image, options) {
    if (!(this instanceof Potrace)) {
        return new Potrace(image, options);
    }
    this.image = image;
    this.canvas = undefined;
    this.bitmap = undefined;
    this.pathlist = new Array();
    this.options = new Option(options);

    return this;
};

Potrace.prototype = {
    trace: async function () {
        var info = this.options.all();
        var load = new Loader();
        this.image = await load.image(this.image);
        this.bitmap = load.bitmap(this.image, info);
        this.bitmap.pathlist(this.pathlist);
        var process = new Processor(info, this.pathlist);
        process.init();
        var svg = new Svg(info, this.pathlist, this.bitmap);
        var traced = svg.get();
        return traced;
    },
};

Object.assign(Potrace, constants);

module.exports = Potrace;
