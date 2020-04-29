/* Copyright (C) 2001-2013 Peter Selinger.
 *
 * A javascript Node.js port of Potrace (http://potrace.sourceforge.net).
 *
 * Licensed under the GPL
 */

"use strict";

var Potrace = require("./base");

var cb = {};

async function trace(image, options) {
	return new Promise(async (resolve, reject) => {
		var potrace = new Potrace();
		if (arguments.length === 2) {
			potrace.setParameter(options);
		}
		try {
			await potrace.loadImage(image);
			await potrace.process();
			resolve(potrace.getSVG());
		} catch (e) {
			reject(e);
		}
		Object.assign(cb, {
			trace: {
				potrace: potrace
			}
		})
	});
}

module.exports = {
	cb,
    trace,
	Potrace,
};
