const importLocalFile = require('import-local-file');

const localFile = importLocalFile(__filename);
if (localFile) {
    console.log("> using local installed version of vcli");
    require(localFile);
} else {
    require('./run.js');
}
