Object.defineProperty(exports, "_esModule", { value: true });

const chalk = require("chalk");
const semver = require("semver");

const config = require('../package.json');
const requiredVersion = config.engines ? config.engines.node : '>=8';
if (!semver.satisfies(process.version, requiredVersion)) {
    console.log(chalk.red(`you are using Node ${process.version}, but this version of vcli`));
    process.exit(1);
}

require('../index.js').default;
