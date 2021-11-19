import CommandManager from './core'
import createCommand from './commands/createCmd/create'

CommandManager.use(createCommand)

initCommand()

export default function initCommand() {  
    new CommandManager();
}

