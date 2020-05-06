"use strict";

const uuid = require("uuid").v4;
const Core = require("./core");
const Foundation = require("./foundation");
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
		svgSize: 1
	};

	this.imgElement.onload = async () => {
		this.loadCanvas();
		await this.loadBm();
		this.emitter.emit(this.BITMAP_LOADED_EVENT);
	};
}

Potrace.BITMAP_LOADED_EVENT = "bitmapLoadedEvent";
Potrace.TURNPOLICY_BLACK = "black";
Potrace.TURNPOLICY_WHITE = "white";
Potrace.TURNPOLICY_LEFT = "left";
Potrace.TURNPOLICY_RIGHT = "right";
Potrace.TURNPOLICY_MINORITY = "minority";
Potrace.TURNPOLICY_MAJORITY = "majority";
Potrace.TURDSIZE = 2;
Potrace.OPTCURVE = true;
Potrace.ALPHAMAX = 1;
Potrace.OPTTOLERANCE = 0.2;

Potrace.prototype = Object.assign(Core, Foundation);

module.exports = Potrace;
