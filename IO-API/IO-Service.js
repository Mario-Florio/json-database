const fs = require('fs');

const readFileSync = (paramObj) => fs.readFileSync(paramObj.path, paramObj.encoding);

const writeFileSync = (paramObj) => fs.writeFileSync(paramObj.path, paramObj.data);

const existsSync = (paramObj) => fs.existsSync(paramObj.path);

module.exports = {
    readFileSync,
    writeFileSync,
    existsSync
};