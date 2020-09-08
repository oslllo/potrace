"use strict";

const error = require("./error");
const is = require("oslllo-validator");
const constants = require("./constants");

const Option = function (options = {}) {
    this.data = {
        turnpolicy: constants.TURNPOLICY_MINORITY,
        turdsize: 2,
        optcurve: true,
        alphamax: 1,
        opttolerance: 0.2,
        svgSize: 1,
        opt_type: undefined,
    };
    if (!is.object(options)) {
        throw error.invalidParameterError("options", "object", options);
    }
    if (!is.empty(options)) {
        this.update(options);
    }

    return this;
};

Option.prototype = {
    all: function () {
        return this.data;
    },
    get: function (option) {
        if (!is.defined(option) || !is.string(option)) {
            throw error.invalidParameterError("option", "string", option);
        }
        var options = Object.keys(this.data);
        if (!options.includes(option)) {
            throw error.invalidParameterError(
                "setting",
                `one of ${options.toString()}`,
                option
            );
        }
        return this.data[option];
    },
    update: function (options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                this.data[key] = options[key];
            }
        }
    },
};

module.exports = Option;
