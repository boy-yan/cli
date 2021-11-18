// 主的流程控制
export const  apply = (action, ...args) => {
    //babel-env
    const commandHandler = require(`../commands/${action}`)
    if (typeof commandHandler === 'function') {
        commandHandler(...args)
    }
}
