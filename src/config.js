import { version } from '../package.json';

//当前 package.json 的版本号
export const VERSION = version;
export const  actionMap = {
    create: {
        alias: 'c',
        description: 'generate a new project from a template',
        usages: [
            'eft init templateName projectName'
        ]
    }
    //other commands
}
