"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apply = void 0;

// 主的流程控制
const apply = (action, ...args) => {
  //babel-env
  const commandHandler = require(`../commands/${action}`);

  if (typeof commandHandler === 'function') {
    commandHandler(...args);
  }
};

exports.apply = apply;