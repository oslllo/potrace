"use strict";

const Svg = function (info, pathlist, bitmap) {
    this.bitmap = bitmap;
    this.pathlist = pathlist;
    this.size = info.svgSize;
    this.opt_type = info.opt_type;
};

Svg.prototype = {
    bezier: function (i, curve) {
        var size = this.size;
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
    },
    segment: function (i, curve) {
        var size = this.size;
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
    },
    path: function (curve) {
        var size = this.size;
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
                p += this.bezier(i, curve);
            } else if (curve.tag[i] === "CORNER") {
                p += this.segment(i, curve);
            }
        }
        //p +=
        return p;
    },
    get: function () {
        var size = this.size,
            bitmap = this.bitmap,
            pathlist = this.pathlist;

        var w = bitmap.w * size,
            h = bitmap.h * size,
            len = pathlist.length,
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
            c = pathlist[i].curve;
            svg += this.path(c);
        }
        if (this.opt_type === "curve") {
            strokec = "black";
            fillc = "none";
            fillrule = "";
        } else {
            strokec = "none";
            fillc = "black";
            fillrule = ' fill-rule="evenodd"';
        }
        svg += '" stroke="' + strokec + '" fill="' + fillc + '"' + fillrule + "/></svg>";
        return svg;
    },
};

module.exports = Svg;
