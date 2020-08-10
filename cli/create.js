const create = require('../lib/create.js');
const utils = require('../utils/cleanArgs');

module.exports = {
    name: 'create <app-name>',
    alias: '',
    usage: '',
    options: [
        ['-n', '--no-git', '跳过 git 初始化'],
        ['-f', '--force', '撰写覆盖目标可能存在的位置']
    ],
    on: {
        '--help': () => {
            console.log('help');
        }
    },
    async action(name, cliOptions) {
        create(name, utils.cleanArgs(cliOptions));
    }
};
