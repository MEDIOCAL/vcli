Object.defineProperty(exports, '_esModule', { value: true });

function cleanArgs(cmd) {
    const args = {};
    cmd.options.forEach((o) => {
        if (o.long) {
            const key = camelcase(o.long.replace(/^--/, '').replace('no-', ''));
            if (typeof cmd[key] !== 'function') {
                args[key] = cmd[key];
            }
        }
        
    });
    return args;
}

exports.cleanArgs = cleanArgs;

function camelcase(flag) {
    return flag.split('-').reduce((str, word) => {
        return str + word[0].toUpperCase() + word.slice(1);
    });
}
