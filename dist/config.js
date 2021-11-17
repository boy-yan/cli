"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionMap = exports.VERSION = void 0;

var _package = require("../package.json");

//当前 package.json 的版本号
const VERSION = _package.version;
exports.VERSION = VERSION;
const actionMap = {
  create: {
    alias: 'c',
    description: 'generate a new project from a template',
    usages: ['eft create templateName']
  } //other commands

};
exports.actionMap = actionMap;