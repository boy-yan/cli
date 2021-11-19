export interface ICommand {
    name: string;
    alias: string; 
    description: string; 
    usages: string[];
    actionHandler: (...arg) => void
}