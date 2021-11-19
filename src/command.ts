export interface ICommand {
    // 命令名称
    name: string;
    // 别名
    alias?: string;
    // 命令描述 
    description: string; 
    // 命令帮助
    usages: string[];
    // 命令处理函数
    actionHandler: (...arg) => void
}