import fs from "fs";
import ora from "ora";
import ejs from "ejs";
import path from "path";
import chalk from "chalk";
import inquirer from "inquirer";
import symbol from "log-symbols";
// 默认模板位置
const defaultTemplate = path.join(__dirname, "../templates");

const prompts = [
  {
    name: "description",
    message: "Please enter the project description: ",
  },
  {
    name: "author",
    message: "Please enter the author name: ",
  },
];

async function create(pluginName) {
  const destDir = process.cwd();
  const answer = await inquirer.prompt(prompts);
  const loading = ora("create template ...");
  loading.color = 'green'
  const pluginDir = path.join(destDir, pluginName);
  if (!fs.existsSync(pluginDir)) {
    loading.start();
    fs.mkdirSync(pluginDir);
    await crateTemplate(pluginDir, answer);
    loading.succeed('create success');
} else {
    loading.fail();
    console.log(symbol.error, chalk.red("The project already exists"));
  }
}

function crateTemplate(pluginDir, { author, description }) {
  fs.readdir(defaultTemplate, (err, files) => {
    if (err) throw err
    try {
        files.forEach((item) => {
          // 通过模板引擎去渲染文件
          ejs.renderFile(path.join(defaultTemplate, item), { author, description },
            (err, res) => {
              if (err) throw err;
              //  将结果写入目标文件路径
              fs.writeFileSync(path.join(pluginDir, item), res);
            }
          );
        });
    } catch (err) {
        throw err
    }
  });
}

module.exports = create;
