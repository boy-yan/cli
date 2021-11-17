"use strict";

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _commander = _interopRequireDefault(require("commander"));

var _index = require("./utils/index");

var _config = require("./config");

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md#%E5%91%BD%E4%BB%A4
Object.keys(_config.actionMap).forEach(action => {
  _commander.default.command(action).description(_config.actionMap[action].description).alias(_config.actionMap[action].alias) //别名
  .action(() => {
    (0, _index.apply)(action, ...process.argv.slice(3));
  });
});

function help() {
  console.log('\r\nUsage:');
  Object.keys(_config.actionMap).forEach(action => {
    _config.actionMap[action].usages.forEach(usage => {
      console.log('  - ' + usage);
    });
  });
  console.log('\r');
}

_commander.default.usage('<command> [options]');

_commander.default.on('-h', help);

_commander.default.on('--help', help);

_commander.default.version(_config.VERSION, '-V --version').parse(process.argv); // eft 不带参数时


if (!process.argv.slice(2).length) {
  _commander.default.outputHelp(make_green);
}

function make_green(txt) {
  return _chalk.default.green(txt);
}