export const  actionMap = {
    init: {
        description: 'generate a new project from a template',
        usages: [
            'eft init templateName projectName'
        ]
    },
    config: {
        alias: 'cfg',
        description: 'config .eftConfig',
        usages: [
            'eft config set <k> <v>',
            'eft config get <k>',
            'eft config remove <k>'
        ]
        
    },
    //other commands
}