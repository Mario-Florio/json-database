const fs = require('fs');

const dbPath = process.env.DBPATH || './database/collections/';
const collectionName = 'db-test';
const collectionDbPath = `${dbPath}${collectionName}.json`;

function cleanDatabase() {
    if (fs.existsSync(collectionDbPath)) {
        fs.unlinkSync(collectionDbPath);
    }
}

module.exports = {
    collectionName,
    cleanDatabase
}