"use strict";

const constants = require("./constants");

const Option = function (options) {
    this.data = {
        turnpolicy: constants.TURNPOLICY_MINORITY,
        turdsize: 2,
        optcurve: true,
        alphamax: 1,
        opttolerance: 0.2,
        svgSize: 1,
        opt_type: undefined,
        ...options,
    };

    return this;
};

Option.prototype = {
    all: function () {
        return this.data;
    },
};

module.exports = Option;
