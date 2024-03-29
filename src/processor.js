"use strict";

const Sum = require("./types/Sum");
const Quad = require("./types/Quad");
const Opti = require("./types/Opti");
const Point = require("./types/Point");
const Curve = require("./types/Curve");

const Processor = function (info, pathlist) {
    this.info = info;
    this.pathlist = pathlist;
};

Processor.prototype = {
    mod: function (a, n) {
        return a >= n ? a % n : a >= 0 ? a : n - 1 - ((-1 - a) % n);
    },
    calcLon: function (path) {
        var n = path.len,
            pt = path.pt,
            dir,
            pivk = new Array(n),
            nc = new Array(n),
            ct = new Array(4);
        path.lon = new Array(n);

        var constraint = [new Point(), new Point()],
            cur = new Point(),
            off = new Point(),
            dk = new Point(),
            foundk;

        var i,
            j,
            k1,
            a,
            b,
            c,
            d,
            k = 0;
        for (i = n - 1; i >= 0; i--) {
            if (pt[i].x != pt[k].x && pt[i].y != pt[k].y) {
                k = i + 1;
            }
            nc[i] = k;
        }

        for (i = n - 1; i >= 0; i--) {
            ct[0] = ct[1] = ct[2] = ct[3] = 0;
            dir =
                (3 +
                    3 * (pt[this.mod(i + 1, n)].x - pt[i].x) +
                    (pt[this.mod(i + 1, n)].y - pt[i].y)) /
                2;
            ct[dir]++;

            constraint[0].x = 0;
            constraint[0].y = 0;
            constraint[1].x = 0;
            constraint[1].y = 0;

            k = nc[i];
            k1 = i;
            while (1) {
                foundk = 0;
                dir =
                    (3 +
                        3 * this.sign(pt[k].x - pt[k1].x) +
                        this.sign(pt[k].y - pt[k1].y)) /
                    2;
                ct[dir]++;

                if (ct[0] && ct[1] && ct[2] && ct[3]) {
                    pivk[i] = k1;
                    foundk = 1;
                    break;
                }

                cur.x = pt[k].x - pt[i].x;
                cur.y = pt[k].y - pt[i].y;

                if (
                    this.xprod(constraint[0], cur) < 0 ||
                    this.xprod(constraint[1], cur) > 0
                ) {
                    break;
                }

                if (Math.abs(cur.x) <= 1 && Math.abs(cur.y) <= 1) {
                } else {
                    off.x = cur.x + (cur.y >= 0 && (cur.y > 0 || cur.x < 0) ? 1 : -1);
                    off.y = cur.y + (cur.x <= 0 && (cur.x < 0 || cur.y < 0) ? 1 : -1);
                    if (this.xprod(constraint[0], off) >= 0) {
                        constraint[0].x = off.x;
                        constraint[0].y = off.y;
                    }
                    off.x = cur.x + (cur.y <= 0 && (cur.y < 0 || cur.x < 0) ? 1 : -1);
                    off.y = cur.y + (cur.x >= 0 && (cur.x > 0 || cur.y < 0) ? 1 : -1);
                    if (this.xprod(constraint[1], off) <= 0) {
                        constraint[1].x = off.x;
                        constraint[1].y = off.y;
                    }
                }
                k1 = k;
                k = nc[k1];
                if (!this.cyclic(k, i, k1)) {
                    break;
                }
            }
            if (foundk === 0) {
                dk.x = this.sign(pt[k].x - pt[k1].x);
                dk.y = this.sign(pt[k].y - pt[k1].y);
                cur.x = pt[k1].x - pt[i].x;
                cur.y = pt[k1].y - pt[i].y;

                a = this.xprod(constraint[0], cur);
                b = this.xprod(constraint[0], dk);
                c = this.xprod(constraint[1], cur);
                d = this.xprod(constraint[1], dk);

                j = 10000000;
                if (b < 0) {
                    j = Math.floor(a / -b);
                }
                if (d > 0) {
                    j = Math.min(j, Math.floor(-c / d));
                }
                pivk[i] = this.mod(k1 + j, n);
            }
        }

        j = pivk[n - 1];
        path.lon[n - 1] = j;
        for (i = n - 2; i >= 0; i--) {
            if (this.cyclic(i + 1, pivk[i], j)) {
                j = pivk[i];
            }
            path.lon[i] = j;
        }

        for (i = n - 1; this.cyclic(this.mod(i + 1, n), j, path.lon[i]); i--) {
            path.lon[i] = j;
        }
    },
    xprod: function (p1, p2) {
        return p1.x * p2.y - p1.y * p2.x;
    },
    cyclic: function (a, b, c) {
        if (a <= c) {
            return a <= b && b < c;
        } else {
            return a <= b || b < c;
        }
    },
    sign: function (i) {
        return i > 0 ? 1 : i < 0 ? -1 : 0;
    },
    interval: function (lambda, a, b) {
        var res = new Point();

        res.x = a.x + lambda * (b.x - a.x);
        res.y = a.y + lambda * (b.y - a.y);
        return res;
    },
    quadform: function (Q, w) {
        var v = new Array(3),
            i,
            j,
            sum;

        v[0] = w.x;
        v[1] = w.y;
        v[2] = 1;
        sum = 0.0;

        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                sum += v[i] * Q.at(i, j) * v[j];
            }
        }
        return sum;
    },
    dorth_infty: function (p0, p2) {
        var r = new Point();

        r.y = this.sign(p2.x - p0.x);
        r.x = -this.sign(p2.y - p0.y);

        return r;
    },
    ddenom: function (p0, p2) {
        var r = this.dorth_infty(p0, p2);

        return r.y * (p2.x - p0.x) - r.x * (p2.y - p0.y);
    },
    dpara: function (p0, p1, p2) {
        var x1, y1, x2, y2;

        x1 = p1.x - p0.x;
        y1 = p1.y - p0.y;
        x2 = p2.x - p0.x;
        y2 = p2.y - p0.y;

        return x1 * y2 - x2 * y1;
    },
    cprod: function (p0, p1, p2, p3) {
        var x1, y1, x2, y2;

        x1 = p1.x - p0.x;
        y1 = p1.y - p0.y;
        x2 = p3.x - p2.x;
        y2 = p3.y - p2.y;

        return x1 * y2 - x2 * y1;
    },
    iprod: function (p0, p1, p2) {
        var x1, y1, x2, y2;

        x1 = p1.x - p0.x;
        y1 = p1.y - p0.y;
        x2 = p2.x - p0.x;
        y2 = p2.y - p0.y;

        return x1 * x2 + y1 * y2;
    },
    iprod1: function (p0, p1, p2, p3) {
        var x1, y1, x2, y2;

        x1 = p1.x - p0.x;
        y1 = p1.y - p0.y;
        x2 = p3.x - p2.x;
        y2 = p3.y - p2.y;

        return x1 * x2 + y1 * y2;
    },
    ddist: function (p, q) {
        return Math.sqrt((p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y));
    },
    bezier: function (t, p0, p1, p2, p3) {
        var s = 1 - t,
            res = new Point();

        res.x =
            s * s * s * p0.x +
            3 * (s * s * t) * p1.x +
            3 * (t * t * s) * p2.x +
            t * t * t * p3.x;
        res.y =
            s * s * s * p0.y +
            3 * (s * s * t) * p1.y +
            3 * (t * t * s) * p2.y +
            t * t * t * p3.y;

        return res;
    },
    tangent: function (p0, p1, p2, p3, q0, q1) {
        var A, B, C, a, b, c, d, s, r1, r2;

        A = this.cprod(p0, p1, q0, q1);
        B = this.cprod(p1, p2, q0, q1);
        C = this.cprod(p2, p3, q0, q1);

        a = A - 2 * B + C;
        b = -2 * A + 2 * B;
        c = A;

        d = b * b - 4 * a * c;

        if (a === 0 || d < 0) {
            return -1.0;
        }

        s = Math.sqrt(d);

        r1 = (-b + s) / (2 * a);
        r2 = (-b - s) / (2 * a);

        if (r1 >= 0 && r1 <= 1) {
            return r1;
        } else if (r2 >= 0 && r2 <= 1) {
            return r2;
        } else {
            return -1.0;
        }
    },
    calcSums: function (path) {
        var i, x, y;
        path.x0 = path.pt[0].x;
        path.y0 = path.pt[0].y;

        path.sums = [];
        var s = path.sums;
        s.push(new Sum(0, 0, 0, 0, 0));
        for (i = 0; i < path.len; i++) {
            x = path.pt[i].x - path.x0;
            y = path.pt[i].y - path.y0;
            s.push(
                new Sum(
                    s[i].x + x,
                    s[i].y + y,
                    s[i].xy + x * y,
                    s[i].x2 + x * x,
                    s[i].y2 + y * y
                )
            );
        }
    },
    penalty3: function (path, i, j) {
        var n = path.len,
            pt = path.pt,
            sums = path.sums;
        var x,
            y,
            xy,
            x2,
            y2,
            k,
            a,
            b,
            c,
            s,
            px,
            py,
            ex,
            ey,
            r = 0;
        if (j >= n) {
            j -= n;
            r = 1;
        }

        if (r === 0) {
            x = sums[j + 1].x - sums[i].x;
            y = sums[j + 1].y - sums[i].y;
            x2 = sums[j + 1].x2 - sums[i].x2;
            xy = sums[j + 1].xy - sums[i].xy;
            y2 = sums[j + 1].y2 - sums[i].y2;
            k = j + 1 - i;
        } else {
            x = sums[j + 1].x - sums[i].x + sums[n].x;
            y = sums[j + 1].y - sums[i].y + sums[n].y;
            x2 = sums[j + 1].x2 - sums[i].x2 + sums[n].x2;
            xy = sums[j + 1].xy - sums[i].xy + sums[n].xy;
            y2 = sums[j + 1].y2 - sums[i].y2 + sums[n].y2;
            k = j + 1 - i + n;
        }

        px = (pt[i].x + pt[j].x) / 2.0 - pt[0].x;
        py = (pt[i].y + pt[j].y) / 2.0 - pt[0].y;
        ey = pt[j].x - pt[i].x;
        ex = -(pt[j].y - pt[i].y);

        a = (x2 - 2 * x * px) / k + px * px;
        b = (xy - x * py - y * px) / k + px * py;
        c = (y2 - 2 * y * py) / k + py * py;

        s = ex * ex * a + 2 * ex * ey * b + ey * ey * c;

        return Math.sqrt(s);
    },
    bestPolygon: function (path) {
        var i,
            j,
            m,
            k,
            n = path.len,
            pen = new Array(n + 1),
            prev = new Array(n + 1),
            clip0 = new Array(n),
            clip1 = new Array(n + 1),
            seg0 = new Array(n + 1),
            seg1 = new Array(n + 1),
            thispen,
            best,
            c;

        for (i = 0; i < n; i++) {
            c = this.mod(path.lon[this.mod(i - 1, n)] - 1, n);
            if (c == i) {
                c = this.mod(i + 1, n);
            }
            if (c < i) {
                clip0[i] = n;
            } else {
                clip0[i] = c;
            }
        }

        j = 1;
        for (i = 0; i < n; i++) {
            while (j <= clip0[i]) {
                clip1[j] = i;
                j++;
            }
        }

        i = 0;
        for (j = 0; i < n; j++) {
            seg0[j] = i;
            i = clip0[i];
        }
        seg0[j] = n;
        m = j;

        i = n;
        for (j = m; j > 0; j--) {
            seg1[j] = i;
            i = clip1[i];
        }
        seg1[0] = 0;

        pen[0] = 0;
        for (j = 1; j <= m; j++) {
            for (i = seg1[j]; i <= seg0[j]; i++) {
                best = -1;
                for (k = seg0[j - 1]; k >= clip1[i]; k--) {
                    thispen = this.penalty3(path, k, i) + pen[k];
                    if (best < 0 || thispen < best) {
                        prev[i] = k;
                        best = thispen;
                    }
                }
                pen[i] = best;
            }
        }
        path.m = m;
        path.po = new Array(m);

        for (i = n, j = m - 1; i > 0; j--) {
            i = prev[i];
            path.po[j] = i;
        }
    },
    pointslope: function (path, i, j, ctr, dir) {
        var n = path.len,
            sums = path.sums,
            x,
            y,
            x2,
            xy,
            y2,
            k,
            a,
            b,
            c,
            lambda2,
            l,
            r = 0;

        while (j >= n) {
            j -= n;
            r += 1;
        }
        while (i >= n) {
            i -= n;
            r -= 1;
        }
        while (j < 0) {
            j += n;
            r -= 1;
        }
        while (i < 0) {
            i += n;
            r += 1;
        }

        x = sums[j + 1].x - sums[i].x + r * sums[n].x;
        y = sums[j + 1].y - sums[i].y + r * sums[n].y;
        x2 = sums[j + 1].x2 - sums[i].x2 + r * sums[n].x2;
        xy = sums[j + 1].xy - sums[i].xy + r * sums[n].xy;
        y2 = sums[j + 1].y2 - sums[i].y2 + r * sums[n].y2;
        k = j + 1 - i + r * n;

        ctr.x = x / k;
        ctr.y = y / k;

        a = (x2 - (x * x) / k) / k;
        b = (xy - (x * y) / k) / k;
        c = (y2 - (y * y) / k) / k;

        lambda2 = (a + c + Math.sqrt((a - c) * (a - c) + 4 * b * b)) / 2;

        a -= lambda2;
        c -= lambda2;

        if (Math.abs(a) >= Math.abs(c)) {
            l = Math.sqrt(a * a + b * b);
            if (l !== 0) {
                dir.x = -b / l;
                dir.y = a / l;
            }
        } else {
            l = Math.sqrt(c * c + b * b);
            if (l !== 0) {
                dir.x = -c / l;
                dir.y = b / l;
            }
        }
        if (l === 0) {
            dir.x = dir.y = 0;
        }
    },
    adjustVertices: function (path) {
        var m = path.m,
            po = path.po,
            n = path.len,
            pt = path.pt,
            x0 = path.x0,
            y0 = path.y0,
            ctr = new Array(m),
            dir = new Array(m),
            q = new Array(m),
            v = new Array(3),
            d,
            i,
            j,
            k,
            l,
            s = new Point();

        path.curve = new Curve(m);

        for (i = 0; i < m; i++) {
            j = po[this.mod(i + 1, m)];
            j = this.mod(j - po[i], n) + po[i];
            ctr[i] = new Point();
            dir[i] = new Point();
            this.pointslope(path, po[i], j, ctr[i], dir[i]);
        }

        for (i = 0; i < m; i++) {
            q[i] = new Quad();
            d = dir[i].x * dir[i].x + dir[i].y * dir[i].y;
            if (d === 0.0) {
                for (j = 0; j < 3; j++) {
                    for (k = 0; k < 3; k++) {
                        q[i].data[j * 3 + k] = 0;
                    }
                }
            } else {
                v[0] = dir[i].y;
                v[1] = -dir[i].x;
                v[2] = -v[1] * ctr[i].y - v[0] * ctr[i].x;
                for (l = 0; l < 3; l++) {
                    for (k = 0; k < 3; k++) {
                        q[i].data[l * 3 + k] = (v[l] * v[k]) / d;
                    }
                }
            }
        }

        var Q, w, dx, dy, det, min, cand, xmin, ymin, z;
        for (i = 0; i < m; i++) {
            Q = new Quad();
            w = new Point();

            s.x = pt[po[i]].x - x0;
            s.y = pt[po[i]].y - y0;

            j = this.mod(i - 1, m);

            for (l = 0; l < 3; l++) {
                for (k = 0; k < 3; k++) {
                    Q.data[l * 3 + k] = q[j].at(l, k) + q[i].at(l, k);
                }
            }

            while (1) {
                det = Q.at(0, 0) * Q.at(1, 1) - Q.at(0, 1) * Q.at(1, 0);
                if (det !== 0.0) {
                    w.x = (-Q.at(0, 2) * Q.at(1, 1) + Q.at(1, 2) * Q.at(0, 1)) / det;
                    w.y = (Q.at(0, 2) * Q.at(1, 0) - Q.at(1, 2) * Q.at(0, 0)) / det;
                    break;
                }

                if (Q.at(0, 0) > Q.at(1, 1)) {
                    v[0] = -Q.at(0, 1);
                    v[1] = Q.at(0, 0);
                } else if (Q.at(1, 1)) {
                    v[0] = -Q.at(1, 1);
                    v[1] = Q.at(1, 0);
                } else {
                    v[0] = 1;
                    v[1] = 0;
                }
                d = v[0] * v[0] + v[1] * v[1];
                v[2] = -v[1] * s.y - v[0] * s.x;
                for (l = 0; l < 3; l++) {
                    for (k = 0; k < 3; k++) {
                        Q.data[l * 3 + k] += (v[l] * v[k]) / d;
                    }
                }
            }
            dx = Math.abs(w.x - s.x);
            dy = Math.abs(w.y - s.y);
            if (dx <= 0.5 && dy <= 0.5) {
                path.curve.vertex[i] = new Point(w.x + x0, w.y + y0);
                continue;
            }

            min = this.quadform(Q, s);
            xmin = s.x;
            ymin = s.y;

            if (Q.at(0, 0) !== 0.0) {
                for (z = 0; z < 2; z++) {
                    w.y = s.y - 0.5 + z;
                    w.x = -(Q.at(0, 1) * w.y + Q.at(0, 2)) / Q.at(0, 0);
                    dx = Math.abs(w.x - s.x);
                    cand = this.quadform(Q, w);
                    if (dx <= 0.5 && cand < min) {
                        min = cand;
                        xmin = w.x;
                        ymin = w.y;
                    }
                }
            }

            if (Q.at(1, 1) !== 0.0) {
                for (z = 0; z < 2; z++) {
                    w.x = s.x - 0.5 + z;
                    w.y = -(Q.at(1, 0) * w.x + Q.at(1, 2)) / Q.at(1, 1);
                    dy = Math.abs(w.y - s.y);
                    cand = this.quadform(Q, w);
                    if (dy <= 0.5 && cand < min) {
                        min = cand;
                        xmin = w.x;
                        ymin = w.y;
                    }
                }
            }

            for (l = 0; l < 2; l++) {
                for (k = 0; k < 2; k++) {
                    w.x = s.x - 0.5 + l;
                    w.y = s.y - 0.5 + k;
                    cand = this.quadform(Q, w);
                    if (cand < min) {
                        min = cand;
                        xmin = w.x;
                        ymin = w.y;
                    }
                }
            }

            path.curve.vertex[i] = new Point(xmin + x0, ymin + y0);
        }
    },
    smooth: function (path) {
        var m = path.curve.n,
            curve = path.curve;

        var i, j, k, dd, denom, alpha, p2, p3, p4;

        for (i = 0; i < m; i++) {
            j = this.mod(i + 1, m);
            k = this.mod(i + 2, m);
            p4 = this.interval(1 / 2.0, curve.vertex[k], curve.vertex[j]);

            denom = this.ddenom(curve.vertex[i], curve.vertex[k]);
            if (denom !== 0.0) {
                dd =
                    this.dpara(curve.vertex[i], curve.vertex[j], curve.vertex[k]) / denom;
                dd = Math.abs(dd);
                alpha = dd > 1 ? 1 - 1.0 / dd : 0;
                alpha = alpha / 0.75;
            } else {
                alpha = 4 / 3.0;
            }
            curve.alpha0[j] = alpha;

            if (alpha >= this.info.alphamax) {
                curve.tag[j] = "CORNER";
                curve.c[3 * j + 1] = curve.vertex[j];
                curve.c[3 * j + 2] = p4;
            } else {
                if (alpha < 0.55) {
                    alpha = 0.55;
                } else if (alpha > 1) {
                    alpha = 1;
                }
                p2 = this.interval(0.5 + 0.5 * alpha, curve.vertex[i], curve.vertex[j]);
                p3 = this.interval(0.5 + 0.5 * alpha, curve.vertex[k], curve.vertex[j]);
                curve.tag[j] = "CURVE";
                curve.c[3 * j + 0] = p2;
                curve.c[3 * j + 1] = p3;
                curve.c[3 * j + 2] = p4;
            }
            curve.alpha[j] = alpha;
            curve.beta[j] = 0.5;
        }
        curve.alphacurve = 1;
    },
    reverse: function (path) {
        var curve = path.curve,
            m = curve.n,
            v = curve.vertex,
            i,
            j,
            tmp;

        for (i = 0, j = m - 1; i < j; i++, j--) {
            tmp = v[i];
            v[i] = v[j];
            v[j] = tmp;
        }
    },
    opti_penalty: function (path, i, j, res, opttolerance, convc, areac) {
        var m = path.curve.n,
            curve = path.curve,
            vertex = curve.vertex,
            k,
            k1,
            k2,
            conv,
            i1,
            area,
            alpha,
            d,
            d1,
            d2,
            p0,
            p1,
            p2,
            p3,
            pt,
            A,
            R,
            A1,
            A2,
            A3,
            A4,
            s,
            t;

        if (i == j) {
            return 1;
        }

        k = i;
        i1 = this.mod(i + 1, m);
        k1 = this.mod(k + 1, m);
        conv = convc[k1];
        if (conv === 0) {
            return 1;
        }
        d = this.ddist(vertex[i], vertex[i1]);
        for (k = k1; k != j; k = k1) {
            k1 = this.mod(k + 1, m);
            k2 = this.mod(k + 2, m);
            if (convc[k1] != conv) {
                return 1;
            }
            if (
                this.sign(this.cprod(vertex[i], vertex[i1], vertex[k1], vertex[k2])) !=
                conv
            ) {
                return 1;
            }
            if (
                this.iprod1(vertex[i], vertex[i1], vertex[k1], vertex[k2]) <
                d * this.ddist(vertex[k1], vertex[k2]) * -0.999847695156
            ) {
                return 1;
            }
        }

        p0 = curve.c[this.mod(i, m) * 3 + 2].copy();
        p1 = vertex[this.mod(i + 1, m)].copy();
        p2 = vertex[this.mod(j, m)].copy();
        p3 = curve.c[this.mod(j, m) * 3 + 2].copy();

        area = areac[j] - areac[i];
        area -= this.dpara(vertex[0], curve.c[i * 3 + 2], curve.c[j * 3 + 2]) / 2;
        if (i >= j) {
            area += areac[m];
        }

        A1 = this.dpara(p0, p1, p2);
        A2 = this.dpara(p0, p1, p3);
        A3 = this.dpara(p0, p2, p3);

        A4 = A1 + A3 - A2;

        if (A2 == A1) {
            return 1;
        }

        t = A3 / (A3 - A4);
        s = A2 / (A2 - A1);
        A = (A2 * t) / 2.0;

        if (A === 0.0) {
            return 1;
        }

        R = area / A;
        alpha = 2 - Math.sqrt(4 - R / 0.3);

        res.c[0] = this.interval(t * alpha, p0, p1);
        res.c[1] = this.interval(s * alpha, p3, p2);
        res.alpha = alpha;
        res.t = t;
        res.s = s;

        p1 = res.c[0].copy();
        p2 = res.c[1].copy();

        res.pen = 0;

        for (k = this.mod(i + 1, m); k != j; k = k1) {
            k1 = this.mod(k + 1, m);
            t = this.tangent(p0, p1, p2, p3, vertex[k], vertex[k1]);
            if (t < -0.5) {
                return 1;
            }
            pt = this.bezier(t, p0, p1, p2, p3);
            d = this.ddist(vertex[k], vertex[k1]);
            if (d === 0.0) {
                return 1;
            }
            d1 = this.dpara(vertex[k], vertex[k1], pt) / d;
            if (Math.abs(d1) > opttolerance) {
                return 1;
            }
            if (
                this.iprod(vertex[k], vertex[k1], pt) < 0 ||
                this.iprod(vertex[k1], vertex[k], pt) < 0
            ) {
                return 1;
            }
            res.pen += d1 * d1;
        }

        for (k = i; k != j; k = k1) {
            k1 = this.mod(k + 1, m);
            t = this.tangent(p0, p1, p2, p3, curve.c[k * 3 + 2], curve.c[k1 * 3 + 2]);
            if (t < -0.5) {
                return 1;
            }
            pt = this.bezier(t, p0, p1, p2, p3);
            d = this.ddist(curve.c[k * 3 + 2], curve.c[k1 * 3 + 2]);
            if (d === 0.0) {
                return 1;
            }
            d1 = this.dpara(curve.c[k * 3 + 2], curve.c[k1 * 3 + 2], pt) / d;
            d2 = this.dpara(curve.c[k * 3 + 2], curve.c[k1 * 3 + 2], vertex[k1]) / d;
            d2 *= 0.75 * curve.alpha[k1];
            if (d2 < 0) {
                d1 = -d1;
                d2 = -d2;
            }
            if (d1 < d2 - opttolerance) {
                return 1;
            }
            if (d1 < d2) {
                res.pen += (d1 - d2) * (d1 - d2);
            }
        }

        return 0;
    },
    optiCurve: function (path) {
        var curve = path.curve,
            m = curve.n,
            vert = curve.vertex,
            pt = new Array(m + 1),
            pen = new Array(m + 1),
            len = new Array(m + 1),
            opt = new Array(m + 1),
            om,
            i,
            j,
            r,
            o = new Opti(),
            p0,
            i1,
            area,
            alpha,
            ocurve,
            s,
            t;

        var convc = new Array(m),
            areac = new Array(m + 1);

        for (i = 0; i < m; i++) {
            if (curve.tag[i] == "CURVE") {
                convc[i] = this.sign(
                    this.dpara(
                        vert[this.mod(i - 1, m)],
                        vert[i],
                        vert[this.mod(i + 1, m)]
                    )
                );
            } else {
                convc[i] = 0;
            }
        }

        area = 0.0;
        areac[0] = 0.0;
        p0 = curve.vertex[0];
        for (i = 0; i < m; i++) {
            i1 = this.mod(i + 1, m);
            if (curve.tag[i1] == "CURVE") {
                alpha = curve.alpha[i1];
                area +=
                    (0.3 *
                        alpha *
                        (4 - alpha) *
                        this.dpara(curve.c[i * 3 + 2], vert[i1], curve.c[i1 * 3 + 2])) /
                    2;
                area += this.dpara(p0, curve.c[i * 3 + 2], curve.c[i1 * 3 + 2]) / 2;
            }
            areac[i + 1] = area;
        }

        pt[0] = -1;
        pen[0] = 0;
        len[0] = 0;

        for (j = 1; j <= m; j++) {
            pt[j] = j - 1;
            pen[j] = pen[j - 1];
            len[j] = len[j - 1] + 1;

            for (i = j - 2; i >= 0; i--) {
                r = this.opti_penalty(
                    path,
                    i,
                    this.mod(j, m),
                    o,
                    this.info.opttolerance,
                    convc,
                    areac
                );
                if (r) {
                    break;
                }
                if (
                    len[j] > len[i] + 1 ||
                    (len[j] == len[i] + 1 && pen[j] > pen[i] + o.pen)
                ) {
                    pt[j] = i;
                    pen[j] = pen[i] + o.pen;
                    len[j] = len[i] + 1;
                    opt[j] = o;
                    o = new Opti();
                }
            }
        }
        om = len[m];
        ocurve = new Curve(om);
        s = new Array(om);
        t = new Array(om);

        j = m;
        for (i = om - 1; i >= 0; i--) {
            if (pt[j] == j - 1) {
                ocurve.tag[i] = curve.tag[this.mod(j, m)];
                ocurve.c[i * 3 + 0] = curve.c[this.mod(j, m) * 3 + 0];
                ocurve.c[i * 3 + 1] = curve.c[this.mod(j, m) * 3 + 1];
                ocurve.c[i * 3 + 2] = curve.c[this.mod(j, m) * 3 + 2];
                ocurve.vertex[i] = curve.vertex[this.mod(j, m)];
                ocurve.alpha[i] = curve.alpha[this.mod(j, m)];
                ocurve.alpha0[i] = curve.alpha0[this.mod(j, m)];
                ocurve.beta[i] = curve.beta[this.mod(j, m)];
                s[i] = t[i] = 1.0;
            } else {
                ocurve.tag[i] = "CURVE";
                ocurve.c[i * 3 + 0] = opt[j].c[0];
                ocurve.c[i * 3 + 1] = opt[j].c[1];
                ocurve.c[i * 3 + 2] = curve.c[this.mod(j, m) * 3 + 2];
                ocurve.vertex[i] = this.interval(
                    opt[j].s,
                    curve.c[this.mod(j, m) * 3 + 2],
                    vert[this.mod(j, m)]
                );
                ocurve.alpha[i] = opt[j].alpha;
                ocurve.alpha0[i] = opt[j].alpha;
                s[i] = opt[j].s;
                t[i] = opt[j].t;
            }
            j = pt[j];
        }

        for (i = 0; i < om; i++) {
            i1 = this.mod(i + 1, om);
            ocurve.beta[i] = s[i] / (s[i] + t[i1]);
        }
        ocurve.alphacurve = 1;
        path.curve = ocurve;
    },
    init: function () {
        var i, path;
        for (i = 0; i < this.pathlist.length; i++) {
            path = this.pathlist[i];
            this.calcSums(path);
            this.calcLon(path);
            this.bestPolygon(path);
            this.adjustVertices(path);

            if (path.sign === "-") {
                this.reverse(path);
            }

            this.smooth(path);

            if (this.info.optcurve) {
                this.optiCurve(path);
            }
        }
    },
};

module.exports = Processor;
