const fs = require('fs');

const dbPath = './database/collections/';
const collectionName = `${dbPath}db-test`;
const collectionPath = `${collectionName}.json`;

function cleanDatabase() {
    if (fs.existsSync(collectionPath)) {
        fs.unlinkSync(collectionPath);
    }
}

module.exports = {
    collectionName,
    cleanDatabase
}