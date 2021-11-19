# EFT-CLI 脚手架

### 介绍

该项目使用微内核架构设计`CommandManager`类做为核心，统一管理命令的角色，每个命令都是一个单独模块，如果需要拓展命令只需要实现 `ICommand` 接口，然后再通过 `CommandManager.use()` 注册你的命令,系统就会初始化你的命令
### 安装依赖

`npm install`

### 启动
`npm run start`

### 执行 `npm link`
在本地开发npm模块的时候，我们可以使用npm link命令，将npm 模块链接到对应的运行项目中去，方便地对模块进行调试和测试
[文档地址](https://docs.npmjs.com/cli/v8/commands/npm-link)


此时就可以使用 `eft` 命令了。

- `eft create my-template`

