'use strict';

const canvas = require('canvas');
const { JSDOM } = require('jsdom');
const Dom = new JSDOM(``, { resources: 'usable' });
const Document = Dom.window.document;

module.exports = { Dom, Document };
