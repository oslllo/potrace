"use strict";

const Path = require("./Path");
const Point = require("./Point");

const Bitmap = function (w, h, info) {
    this.w = w;
    this.h = h;
    this.info = info;
    this.size = w * h;
    this.bm1 = undefined;
    this.path = undefined;
    this.arraybuffer = new ArrayBuffer(this.size);
    this.data = new Int8Array(this.arraybuffer);
};

Bitmap.prototype = {
    at: function (x, y) {
        return (
            x >= 0 &&
            x < this.w &&
            y >= 0 &&
            y < this.h &&
            this.data[this.w * y + x] === 1
        );
    },
    index: function (i) {
        var point = new Point();
        point.y = Math.floor(i / this.w);
        point.x = i - point.y * this.w;
        return point;
    },
    flip: function (x, y) {
        if (this.at(x, y)) {
            this.data[this.w * y + x] = 0;
        } else {
            this.data[this.w * y + x] = 1;
        }
    },
    copy: function () {
        var bm = new Bitmap(this.w, this.h),
            i;
        for (i = 0; i < this.size; i++) {
            bm.data[i] = this.data[i];
        }

        return bm;
    },
    findNext: function (point) {
        var bm1 = this.bm1;
        var i = bm1.w * point.y + point.x;
        while (i < bm1.size && bm1.data[i] !== 1) {
            i++;
        }

        return i < bm1.size && bm1.index(i);
    },
    majority: function (x, y) {
        var bm1 = this.bm1;
        var i, a, ct;
        for (i = 2; i < 5; i++) {
            ct = 0;
            for (a = -i + 1; a <= i - 1; a++) {
                ct += bm1.at(x + a, y + i - 1) ? 1 : -1;
                ct += bm1.at(x + i - 1, y + a - 1) ? 1 : -1;
                ct += bm1.at(x + a - 1, y - i) ? 1 : -1;
                ct += bm1.at(x - i, y + a) ? 1 : -1;
            }
            if (ct > 0) {
                return 1;
            } else if (ct < 0) {
                return 0;
            }
        }
        return 0;
    },
    findPath: function (point) {
        var bm1 = this.bm1;
        var info = this.info;
        var path = new Path(),
            x = point.x,
            y = point.y,
            dirx = 0,
            diry = 1,
            tmp;

        path.sign = this.at(point.x, point.y) ? "+" : "-";

        while (1) {
            path.pt.push(new Point(x, y));
            if (x > path.maxX) path.maxX = x;
            if (x < path.minX) path.minX = x;
            if (y > path.maxY) path.maxY = y;
            if (y < path.minY) path.minY = y;
            path.len++;

            x += dirx;
            y += diry;
            path.area -= x * diry;

            if (x === point.x && y === point.y) break;

            var l = bm1.at(x + (dirx + diry - 1) / 2, y + (diry - dirx - 1) / 2);
            var r = bm1.at(x + (dirx - diry - 1) / 2, y + (diry + dirx - 1) / 2);

            if (r && !l) {
                if (
                    info.turnpolicy === "right" ||
                    (info.turnpolicy === "black" && path.sign === "+") ||
                    (info.turnpolicy === "white" && path.sign === "-") ||
                    (info.turnpolicy === "majority" && this.majority(x, y)) ||
                    (info.turnpolicy === "minority" && !this.majority(x, y))
                ) {
                    tmp = dirx;
                    dirx = -diry;
                    diry = tmp;
                } else {
                    tmp = dirx;
                    dirx = diry;
                    diry = -tmp;
                }
            } else if (r) {
                tmp = dirx;
                dirx = -diry;
                diry = tmp;
            } else if (!l) {
                tmp = dirx;
                dirx = diry;
                diry = -tmp;
            }
        }

        return path;
    },
    xorPath: function (path) {
        var bm1 = this.bm1;
        var y1 = path.pt[0].y,
            len = path.len,
            x,
            y,
            maxX,
            minY,
            i,
            j;
        for (i = 1; i < len; i++) {
            x = path.pt[i].x;
            y = path.pt[i].y;

            if (y !== y1) {
                minY = y1 < y ? y1 : y;
                maxX = path.maxX;
                for (j = x; j < maxX; j++) {
                    bm1.flip(j, minY);
                }
                y1 = y;
            }
        }
    },
    pathlist: function (pathlist) {
        var path;
        this.bm1 = this.copy();
        var currentPoint = new Point(0, 0);
        while ((currentPoint = this.findNext(currentPoint))) {
            path = this.findPath(currentPoint);
            this.xorPath(path);
            if (path.area > this.info.turdsize) {
                pathlist.push(path);
            }
        }
    },
};

module.exports = Bitmap;
