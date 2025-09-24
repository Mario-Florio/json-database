import fs from 'fs';
import fsPromises from 'fs/promises';
import readline from 'node:readline/promises';

const existsSync = (paramObj) => fs.existsSync(paramObj.path);

const writeFile = async (paramObj) =>
    await fsPromises.writeFile(paramObj.path, paramObj.data);

const appendFile = async (paramObj) =>
    await fsPromises.appendFile(paramObj.path, paramObj.data);

async function* readLines({ path }) {
    const rl = getRl(path);

    try {
        for await (const line of rl) {
            if (!line.trim()) continue;
            yield line;
        }
    } finally {
        rl.close();
    }
}

const writeLine = async (paramObj) => {
    const { path, predicate, updater } = paramObj;
    let itemFound = false;

    const tempPath = path + '.tmp';
    const out = fs.createWriteStream(tempPath);

    const rl = getRl(path);

    for await (const line of rl) {
        if (!line.trim()) continue;

        let obj = null;
        try {
            obj = JSON.parse(line);
        } catch {
            out.write(line + '\n');
            continue;
        }

        if (predicate(obj)) {
            itemFound = true;
            const updated = updater ? updater(obj) : null;
            if (updated) out.write(JSON.stringify(updated) + '\n');
        } else {
            out.write(line + '\n');
        }
    }

    rl.close();
    out.end();
    await new Promise((res) => out.on('finish', res));

    fs.renameSync(tempPath, path);

    return { itemFound, success: true };
};

// UTILS
function getRl(path) {
    const stream = fs.createReadStream(path, { encoding: 'utf-8' });
    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity,
    });

    return rl;
}

export default {
    existsSync,
    writeFile,
    appendFile,
    readLines,
    writeLine,
};
