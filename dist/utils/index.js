"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkPathIsDirectory = checkPathIsDirectory;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkPathIsDirectory(path) {
  return new Promise((resolve, reject) => {
    _fs.default.stat(path, (err, stats) => {
      if (err) reject(err);
      resolve(stats.isDirectory());
    });
  });
}