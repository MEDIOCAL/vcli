Object.defineProperty(exports, "_esModule", { value: true });

const program = require('commander');
const chalk = require('chalk');
const create = require('./cli/create');
const pkg = require('./package.json');
const { argv } = process;

program
.version(pkg.version)
.option('-v', '--version', () => {
    console.log(chalk.green(pkg.version));
})
.usage('<command> [options]');

if (argv.length === 2) {
    program.outputHelp();
}

const commands = getCommands();
commands.forEach(val => {
    const cmd = program.command(val.name);
    if (val.alias) {
        cmd.alias(val.alias);
    }
    if (val.usage) {
        cmd.usage(val.usage);
    }
    if (val.options) {
        val.options.forEach(args => {
            cmd.option(...args);
        });
    }
    if (val.on) {
        Object.entries(([k, v]) => {
            cmd.on(k, v);
        });
    }

    if (val.action) {
        cmd.action(async (...args) => {
            try {
                await val.action.apply(null, args);
            } catch(err) {
                console.log(err);
            }
        });
    }
});

program.on('--help', () => {
    console.log('run help');
});
const input = argv[2];

if (!input) {
    program.outputHelp();
}

program.parse(argv);
function getCommands() {
    return [
        create
    ]
}