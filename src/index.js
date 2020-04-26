/* Copyright (C) 2001-2013 Peter Selinger.
 *
 * A javascript port of Potrace (http://potrace.sourceforge.net).
 *
 * Licensed under the GPL
 *
 * Usage
 *   loadImageFromBuffer(file) : load image from Buffer API
 *   loadImageFromPath(path): load image from path
 *     because of the same-origin policy, can not load image from another domain.
 *     input color/grayscale image is simply converted to binary image. no pre-
 *     process is performed.
 *
 *   setParameter({para1: value, ...}) : set parameters
 *     parameters:
 *        turnpolicy ("black" / "white" / "left" / "right" / "minority" / "majority")
 *          how to resolve ambiguities in path decomposition. (default: "minority")
 *        turdsize
 *          suppress speckles of up to this size (default: 2)
 *        optcurve (true / false)
 *          turn on/off curve optimization (default: true)
 *        alphamax
 *          corner threshold parameter (default: 1)
 *        opttolerance
 *          curve optimization tolerance (default: 0.2)
 *
 *   process(callback) : wait for the image be loaded, then run potrace algorithm,
 *                       then call callback function.
 *
 *   getSVG(size, opt_type) : return a string of generated SVG image.
 *                                    result_image_size = original_image_size * size
 *                                    optional parameter opt_type can be "curve"
 */

var Potrace = require("./base");

module.exports = {
	Potrace: Potrace,
};
