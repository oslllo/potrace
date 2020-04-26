"use strict";

const fs = require("fs-extra");
const FileType = require("file-type");
const ImageDataUri = require("image-data-uri");

var Base = {
	loadImageFromBuffer: function (buffer) {
		return new Promise(async (resolve, reject) => {
			this.emitter.on(this.BITMAP_LOADED_EVENT, () => {
				this.emitter.removeAllListeners();
				resolve();
			});
			if (this.info.isReady) {
				this.clear();
			}
			let buffer_type = await FileType.fromBuffer(buffer);
			let uri = ImageDataUri.encode(buffer, buffer_type.ext);
			this.imgElement.src = uri;
		});
	},

	loadImageFromPath: function (path) {
		return new Promise(async (resolve, reject) => {
			if (this.info.isReady) {
				this.clear();
			}
			let buffer = fs.readFileSync(path);
			await this.loadImageFromBuffer(buffer);
			resolve();
		});
	},

	setParameter: function (obj) {
		var key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) {
				this.info[key] = obj[key];
			}
		}
	},

	process: function () {
		return new Promise((resolve, reject) => {
			this.bmToPathlist();
			this.processPath();
			resolve();
		});
	},

	getSVG: function (size, opt_type) {
		// throw new Error('test')
		function path(curve) {
			function bezier(i) {
				var b =
					"C " +
					(curve.c[i * 3 + 0].x * size).toFixed(3) +
					" " +
					(curve.c[i * 3 + 0].y * size).toFixed(3) +
					",";
				b +=
					(curve.c[i * 3 + 1].x * size).toFixed(3) +
					" " +
					(curve.c[i * 3 + 1].y * size).toFixed(3) +
					",";
				b +=
					(curve.c[i * 3 + 2].x * size).toFixed(3) +
					" " +
					(curve.c[i * 3 + 2].y * size).toFixed(3) +
					" ";
				return b;
			}

			function segment(i) {
				var s =
					"L " +
					(curve.c[i * 3 + 1].x * size).toFixed(3) +
					" " +
					(curve.c[i * 3 + 1].y * size).toFixed(3) +
					" ";
				s +=
					(curve.c[i * 3 + 2].x * size).toFixed(3) +
					" " +
					(curve.c[i * 3 + 2].y * size).toFixed(3) +
					" ";
				return s;
			}

			var n = curve.n,
				i;
			var p =
				"M" +
				(curve.c[(n - 1) * 3 + 2].x * size).toFixed(3) +
				" " +
				(curve.c[(n - 1) * 3 + 2].y * size).toFixed(3) +
				" ";
			for (i = 0; i < n; i++) {
				if (curve.tag[i] === "CURVE") {
					p += bezier(i);
				} else if (curve.tag[i] === "CORNER") {
					p += segment(i);
				}
			}
			//p +=
			return p;
		}

		var w = this.bm.w * size,
			h = this.bm.h * size,
			len = this.pathlist.length,
			c,
			i,
			strokec,
			fillc,
			fillrule;

		var svg =
			'<svg version="1.1" width="' +
			w +
			'" height="' +
			h +
			'" xmlns="http://www.w3.org/2000/svg">';
		svg += '<path d="';
		for (i = 0; i < len; i++) {
			c = this.pathlist[i].curve;
			svg += path(c);
		}
		if (opt_type === "curve") {
			strokec = "black";
			fillc = "none";
			fillrule = "";
		} else {
			strokec = "none";
			fillc = "black";
			fillrule = ' fill-rule="evenodd"';
		}
		svg +=
			'" stroke="' + strokec + '" fill="' + fillc + '"' + fillrule + "/></svg>";
		return svg;
	},
};

module.exports = Base;