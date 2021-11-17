"use strict";

require("core-js/modules/es.promise.js");

require("core-js/modules/es.symbol.description.js");

var _fs = _interopRequireDefault(require("fs"));

var _ora = _interopRequireDefault(require("ora"));

var _ejs = _interopRequireDefault(require("ejs"));

var _path = _interopRequireDefault(require("path"));

var _chalk = _interopRequireDefault(require("chalk"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _logSymbols = _interopRequireDefault(require("log-symbols"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 默认模板位置
const defaultTemplate = _path.default.join(__dirname, "../templates");

const prompts = [{
  name: "description",
  message: "Please enter the project description: "
}, {
  name: "author",
  message: "Please enter the author name: "
}];

async function create(pluginName) {
  const destDir = process.cwd();
  const answer = await _inquirer.default.prompt(prompts);
  const loading = (0, _ora.default)("create template ...");
  loading.color = 'green';

  const pluginDir = _path.default.join(destDir, pluginName);

  if (!_fs.default.existsSync(pluginDir)) {
    loading.start();

    _fs.default.mkdirSync(pluginDir);

    await crateTemplate(pluginDir, answer);
    loading.succeed('create success');
  } else {
    loading.fail();
    console.log(_logSymbols.default.error, _chalk.default.red("The project already exists"));
  }
}

function crateTemplate(pluginDir, _ref) {
  let {
    author,
    description
  } = _ref;

  _fs.default.readdir(defaultTemplate, (err, files) => {
    if (err) throw err;

    try {
      files.forEach(item => {
        // 通过模板引擎去渲染文件
        _ejs.default.renderFile(_path.default.join(defaultTemplate, item), {
          author,
          description
        }, (err, res) => {
          if (err) throw err; //  将结果写入目标文件路径

          _fs.default.writeFileSync(_path.default.join(pluginDir, item), res);
        });
      });
    } catch (err) {
      throw err;
    }
  });
}

module.exports = create;