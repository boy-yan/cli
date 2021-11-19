"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commander = require("commander");

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CommandManager {
  static commands = {};

  static use(command) {
    const commandName = command.name;

    if (!CommandManager.commands[commandName]) {
      CommandManager.commands[commandName] = command;
    }
  }

  constructor() {
    this.program = new _commander.Command();
    this.initCommand();
    this.initEvent();
  }

  initCommand() {
    Object.keys(CommandManager.commands).forEach(async key => {
      const {
        description,
        alias,
        actionHandler,
        name
      } = CommandManager.commands[key]; // https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md#%E5%91%BD%E4%BB%A4

      const command = this.program.command(name);

      if (alias) {
        command.alias(alias); //别名
      }

      command.description(description).action(() => actionHandler(...process.argv.slice(3)));
      await this.program.parseAsync(process.argv);
    });
  }

  initEvent() {
    this.program.usage('<command> [options]');
    this.program.on('-h', this.help);
    this.program.on('--help', this.help); // eft 不带参数时

    if (!process.argv.slice(2).length) {
      this.program.outputHelp(_chalk.default.green);
    }
  }

  help() {
    console.log('\r\nUsage:');
    Object.keys(CommandManager.commands).forEach(key => {
      const {
        usages
      } = CommandManager.commands[key];
      usages.forEach(usage => {
        console.log('  - ' + usage);
      });
    });
    console.log('\r');
  }

}

exports.default = CommandManager;