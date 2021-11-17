// 主的流程控制
let apply = (action, ...args) => {
    //babel-env
    require(`./commands/${action}`)(...args);
};

export default apply;