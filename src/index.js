/* Copyright (C) 2001-2013 Peter Selinger.
 *
 * A javascript Node.js port of Potrace (http://potrace.sourceforge.net).
 *
 * Licensed under the GPL
 */

"use strict";

var Potrace = require("./base");

async function trace(image, options) {
	return new Promise(async (resolve, reject) => {
		var potrace = new Potrace();
		if (arguments === 2) {
			potrace.setParameter(options);
		}
		await potrace.loadImage(image);
		await potrace.process();
		resolve(potrace.getSVG());
	});
}

module.exports = {
    trace,
	Potrace,
};
