"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apply = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

// 主的流程控制
const apply = function apply(action) {
  //babel-env
  const commandHandler = require("../commands/".concat(action));

  if (typeof commandHandler === 'function') {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    commandHandler(...args);
  }
};

exports.apply = apply;