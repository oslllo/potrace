"use strict";

const uuid = require("uuid").v4;
const Core = require("./core");
const Foundation = require("./foundation");
const Constants = require("./types/Constants");
const Emitter = require("./types/Emitter");
const { Document } = require("./types/Dom");

function Potrace() {
	this.uuid = uuid();
	this.emitter = new Emitter();
	this.imgElement = Document.createElement("img");
	this.imgCanvas = Document.createElement("canvas");
	this.bm = null;
	this.pathlist = [];
	this.callback;
	this.info = {
		isReady: false,
		turnpolicy: "minority",
		turdsize: 2,
		optcurve: true,
		alphamax: 1,
		opttolerance: 0.2,
	};

	this.imgElement.onload = async () => {
		this.loadCanvas();
		await this.loadBm();
		this.emitter.emit(this.BITMAP_LOADED_EVENT);
	};
}

Potrace.prototype = Object.assign(Core, Foundation);

module.exports = Potrace;
