"use strict";

const jimp = require("jimp");
const error = require("./error");
const Bitmap = require("./types/Bitmap");

const Loader = function () {
};

Loader.prototype = {
    image: function (image) {
        const valid = image instanceof Buffer || typeof image === 'string'
        if (!valid) {
            var err = error.invalidParameterError(
                "image",
                "buffer or path to image",
                image
            );
            throw err;
        }
        return jimp.read(image);
    },
    bitmap: function (image, info) {
        var {
            bitmap: {
                data,
                width,
                height,
            }
        } = image;
        var u8 = new Uint8ClampedArray(data.buffer)
        var bitmap = new Bitmap(width, height, info);
        var l = data.length,
            i,
            j,
            color;
        for (i = 0, j = 0; i < l; i += 4, j++) {
            color =
                0.2126 * data[i] +
                0.7153 * data[i + 1] +
                0.0721 * data[i + 2];
            bitmap.data[j] = color < 128 ? 1 : 0;
        }

        return bitmap;
    },
};

module.exports = Loader;
