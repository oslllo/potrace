'use strict';

const EventEmitter = require('events');

class PotraceEmitter extends EventEmitter {};
const Emitter = PotraceEmitter;

module.exports = Emitter;
