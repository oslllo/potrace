"use strict";

const Svg = require("./svg");
const Loader = require("./loader");
const Option = require("./option");
const { JSDOM } = require("jsdom");
const is = require("oslllo-validator");
const Processor = require("./processor");
const constants = require("./constants");

const Potrace = function (image, options) {
    if (!is.instance(this, Potrace)) {
        return new Potrace(image, options);
    }
    this.image = image;
    this.canvas = undefined;
    this.bitmap = undefined;
    this.pathlist = new Array();
    this.options = new Option(options);
    this.dom = new JSDOM("<!DOCTYPE html><html></html>", { resources: "usable" });

    return this;
};

Potrace.prototype = {
    trace: async function () {
        var info = this.options.all();
        var load = new Loader(this.dom);
        this.image = await load.image(this.image);
        this.canvas = load.canvas(this.image);
        this.bitmap = load.bitmap(this.canvas, info);
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
