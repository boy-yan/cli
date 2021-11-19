"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initCommand;

var _core = _interopRequireDefault(require("./core"));

var _create = _interopRequireDefault(require("./commands/createCmd/create"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_core.default.use(_create.default);

initCommand();

function initCommand() {
  new _core.default();
}