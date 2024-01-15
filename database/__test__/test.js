const DB = require('../DB.js');
const fs = require('fs');

console.log('-------CONSTRUCTOR--------');
it('Adds ".json" suffix to constructor argument', () => {
    const db = new DB('./database/__test__/instances/db-test');

    assert(db.dbName === './database/__test__/instances/db-test.json');
});
console.log('-------INSTANTIATE--------');
it('Creates json file with empty array', () => {
    const db = new DB('./database/__test__/instances/db-test');
    
    db.instantiate();

    const res = db.read();

    assert(fs.existsSync(db.dbName));
    assert(Array.isArray(res));
    assert(res.length === 0);

    fs.unlinkSync(db.dbName);
});
console.log('-------CREATE--------');
it('Returns "Please provide data to save" if no data is given', () => {
    const db = new DB('./database/__test__/instances/db-test');

    const res = db.create();

    assert(res === 'Please provide data to save');
});
it('Creates json file', () => {
    const db = new DB('./database/__test__/instances/db-test');
    const data = {};
    db.create(data);

    assert(fs.existsSync(db.dbName));

    fs.unlinkSync(db.dbName);
});
it('Appends data to existing json file', () => {
    const db = new DB('./database/__test__/instances/db-test');
    const data = 'string data';
    db.create(data);
    const newData = 'new string data';
    db.create(newData);

    const jsonFile = fs.readFileSync(db.dbName, 'utf-8');
    const jsonFileData = JSON.parse(jsonFile);

    assert(arraysEqual(jsonFileData, [data, newData]));

    fs.unlinkSync(db.dbName);
});

console.log('-------READ--------');
it('Returns "Database does not exist" if database file does not exist', () => {
    const db = new DB('./database/__test__/instances/db-test');
    const res = db.read();

    assert(res === 'Database does not exist');
});
it('Reads and returns database file', () => {
    const db = new DB('./database/__test__/instances/db-test');
    const data = 'data';
    db.create(data);

    const res = db.read();

    assert(res[0] === data);

    fs.unlinkSync(db.dbName);
});
it('Reads and returns js data', () => {
    const db = new DB('./database/__test__/instances/db-test');
    const data = {};
    db.create(data);

    const res = db.read();

    assert(typeof res[0] === 'object');

    fs.unlinkSync(db.dbName);
});

console.log('-------UPDATE--------');
it('Returns "No item id was supplied" if no id is passed', () => {
    const db = new DB('./database/__test__/instances/db-test');

    const res = db.update();

    assert(res === 'No item id was supplied');
});
it('Returns "Update successful" if update is successful', () => {
    const db = new DB('./database/__test__/instances/db-test');
    const data = { _id: 1, text: 'Original data' };
    db.create(data);
    const updatedData = { _id: 1, text: 'Updated data' };

    const res = db.update(1, updatedData);

    assert(res === 'Update successful');

    fs.unlinkSync(db.dbName);
});

console.log('-------DELETE--------');
it('Returns "No item id was supplied" if no id is passed', () => {
    const db = new DB('./database/__test__/instances/db-test');

    const res = db.delete();

    assert(res === 'No item id was supplied');
});
it('Returns "Deletion successful" if deletion is successful', () => {
    const db = new DB('./database/__test__/instances/db-test');
    const data = { _id: 1, text: 'Original data' };
    db.create(data);

    const res = db.delete(1);

    assert(res === 'Deletion successful');
    
    fs.unlinkSync(db.dbName);
});
it('Returns "Database does not exist" if database file does not exist', () => {
    const db = new DB('./database/__test__/instances/db-test');

    const res = db.delete(1);

    assert(res === 'Database does not exist');
});
it('Deletes data', () => {
    const db = new DB('./database/__test__/instances/db-test');
    const data = { _id: 1, text: 'Original data' };
    db.create(data);
    db.delete(1);

    const dataStore = db.read();

    assert(dataStore.length === 0);

    fs.unlinkSync(db.dbName);
});

// UTILS
function it(desc, fn) {
    try {
        fn();
        console.log('\x1b[32m%s\x1b[0m', '\u2714 ' + desc);
    } catch (error) {
        console.log('\n');
        console.log('\x1b[31m%s\x1b[0m', '\u2718 ' + desc);
        console.error(error);
    }
}

function assert(condition) {
    if (!condition) {
        throw new Error();
    }
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}
