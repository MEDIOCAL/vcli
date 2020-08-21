const child_process = require('child_process');

module.exports = class VueCli {
    constructor(options, template) {
        this.template = template;
        this.options = options;
    }

    run(name) {
        const { template, options } = this;
        const command = ['create', name];
        command.push('-p', template.url);
        command.push('-c');
        command.push('-r', 'http://registry.npmjs.org');
        command.push(...['--git', 'chore: init']);
        this.cliBootstrap(command);
    }

    cliBootstrap(command = []) {
        try {
            const vueCliBin = require.resolve('@vue/cli/bin/vue');
            const child = child_process.fork(vueCliBin, command, {
                stdio: 'inherit'
            });
            child.on('message', args => {
                if (process.send) {
                    process.send(args);
                }
            });
    
            child.on('exit', (code, signal) => {
                if (signal === 'SIGABRT') {
                    process.exit(1);
                }
                process.exit(code);
            });
    
            child.on('SIGINT', () => {
                child.kil('SIGINT');
            });
        } catch(err) {
            console.log(err);
        }
    }
}

