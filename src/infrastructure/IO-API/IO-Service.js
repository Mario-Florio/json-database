import fs from 'fs';
import fsPromises from 'fs/promises';

const readFileSync = (paramObj) =>
    fs.readFileSync(paramObj.path, paramObj.encoding);

const writeFileSync = (paramObj) =>
    fs.writeFileSync(paramObj.path, paramObj.data);

const existsSync = (paramObj) => fs.existsSync(paramObj.path);

const readFile = async (paramObj) =>
    await fsPromises.readFile(paramObj.path, paramObj.encoding);

const writeFile = async (paramObj) =>
    await fsPromises.writeFile(paramObj.path, paramObj.data);

const readLines = async (paramObj) => {
    try {
        const json = await fsPromises.readFile(
            paramObj.path,
            paramObj.encoding,
        );
        const data = JSON.parse(json);
        return lineGenerator(data);
    } catch (err) {
        return console.error(err);
    }
};

// UTILS
function* lineGenerator(data) {
    for (const record of data) {
        const line = JSON.stringify(record);
        yield line;
    }
}

export default {
    readFileSync,
    writeFileSync,
    existsSync,
    readFile,
    writeFile,
    readLines,
};
