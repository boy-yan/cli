"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _ora = _interopRequireDefault(require("ora"));

var _ejs = _interopRequireDefault(require("ejs"));

var _path = _interopRequireDefault(require("path"));

var _chalk = _interopRequireDefault(require("chalk"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _logSymbols = _interopRequireDefault(require("log-symbols"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 默认模板位置
const defaultTemplateDir = _path.default.join(__dirname, './templates');

const prompts = [{
  name: 'description',
  message: 'Please enter the plugin description: '
}, {
  name: 'author',
  message: 'Please enter the author name: '
}];

async function actionHandler(pluginName) {
  if (!pluginName) return console.log(_logSymbols.default.error, _chalk.default.red('The pluginName is required'));
  const destDir = process.cwd();

  const pluginDir = _path.default.join(destDir, pluginName);

  if (!_fs.default.existsSync(pluginDir)) {
    const answer = await _inquirer.default.prompt(prompts);
    const loading = (0, _ora.default)('create template ...');
    loading.color = 'green';

    try {
      loading.start();

      _fs.default.mkdirSync(pluginDir);

      await init(pluginDir, answer);
      loading.succeed('create success');
    } catch (error) {
      loading.fail('create fail');
      console.log(_logSymbols.default.error, error);
    }
  } else {
    console.log(_logSymbols.default.error, _chalk.default.red('The plugin already exists'));
  }
}

async function init(pluginDir, options) {
  await cratePluginByTemplate(defaultTemplateDir, pluginDir);

  async function cratePluginByTemplate(templateDir, targetDir) {
    const templateFiles = _fs.default.readdirSync(templateDir);

    for (const item of templateFiles) {
      const templateItemPath = _path.default.join(templateDir, item);

      const targetPath = _path.default.join(targetDir, item);

      const isDirectory = await checkPathIsDirectory(templateItemPath);

      if (isDirectory) {
        // 目录
        _fs.default.mkdirSync(targetPath);

        await cratePluginByTemplate(templateItemPath, targetPath);
      } else {
        // 文件
        // 通过模板引擎去渲染文件
        _ejs.default.renderFile(templateItemPath, options, (err, res) => {
          if (err) throw err; //  将结果写入目标文件路径

          _fs.default.writeFileSync(targetPath, res);
        });
      }
    }
  }
}

function checkPathIsDirectory(path) {
  return new Promise((resolve, reject) => {
    _fs.default.stat(path, (err, stats) => {
      if (err) reject(err);
      resolve(stats.isDirectory());
    });
  });
}

const createCommand = {
  name: 'create',
  alias: 'c',
  description: 'generate a new project from a template',
  usages: ['eft create templateName'],
  actionHandler
};
var _default = createCommand;
exports.default = _default;