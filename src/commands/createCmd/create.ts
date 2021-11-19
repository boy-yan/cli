import fs from 'fs';
import ora from 'ora';
import ejs from 'ejs';
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import symbol from 'log-symbols';
import { ICommand } from '../../command';

// 默认模板位置
const defaultTemplateDir = path.join(__dirname, './templates');

const prompts = [
  {
    name: 'description',
    message: 'Please enter the plugin description: ',
  },
  {
    name: 'author',
    message: 'Please enter the author name: ',
  },
];

async function actionHandler(pluginName: string) {
  if (!pluginName)
    return console.log(symbol.error, chalk.red('The pluginName is required'));
  const destDir = process.cwd();
  const pluginDir = path.join(destDir, pluginName);
  if (!fs.existsSync(pluginDir)) {
    const answer = await inquirer.prompt(prompts);
    const loading = ora('create template ...');
    loading.color = 'green';
    try {
      loading.start();
      fs.mkdirSync(pluginDir);
      await init(pluginDir, answer);
      loading.succeed('create success');
    } catch (error) {
      loading.fail('create fail');
      console.log(symbol.error, error);
    }
  } else {
    console.log(symbol.error, chalk.red('The plugin already exists'));
  }
}

async function init(pluginDir, options) {
  await cratePluginByTemplate(defaultTemplateDir, pluginDir);

  async function cratePluginByTemplate(templateDir, targetDir) {
    const templateFiles = fs.readdirSync(templateDir);
    for (const item of templateFiles) {
      const templateItemPath = path.join(templateDir, item);
      const targetPath = path.join(targetDir, item);
      const isDirectory = await checkPathIsDirectory(templateItemPath);
      if (isDirectory) {
        // 目录
        fs.mkdirSync(targetPath);
        await cratePluginByTemplate(templateItemPath, targetPath);
      } else {
        // 文件
        // 通过模板引擎去渲染文件
        ejs.renderFile(templateItemPath, options, (err, res) => {
          if (err) throw err;
          //  将结果写入目标文件路径
          fs.writeFileSync(targetPath, res);
        });
      }
    }
  }
}

function checkPathIsDirectory(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) reject(err);
      resolve(stats.isDirectory());
    });
  });
}

const createCommand: ICommand = {
  name: 'create',
  alias: 'c',
  description: 'generate a new project from a template',
  usages: ['eft create templateName'],
  actionHandler,
};

export default createCommand;
