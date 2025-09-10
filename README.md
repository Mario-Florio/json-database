# JSON Database

A lightweight JSON file–based database wrapper providing a simple ODM-like interface for Node.js projects.

**This library is intended for local hobby projects, prototyping, or educational purposes to mock simple Mongoose/MongoDB-like methods. It is not designed for production use or serious data handling.**

## Overview

This project exposes a `Model` class which acts as an API for CRUD operations on a JSON file. The low-level file operations are handled by the `DB` class internally; users interact only with the `Model` class through its subclasses (which allow for customization of properties).

## Features

- Simple JSON file persistence for local projects
- ODM-like static methods for querying (`find`, `findById`, `findOne`, etc.)
- Instance methods for creating and saving records
- Flexible querying by arbitrary keys
- Automatically generates unique IDs and timestamps for new records

## Setup

1. Clone repo (or copy) into project.
2. Create folder for database files.
3. Set `config.DBPATH` in `json-database/config.js` (or an *env var* `DBPATH`) to folder for database files.
4. Import `ODM` from `json-database/main.js` where needed in project and use as needed (see *Usage*).

## Usage

```javascript
import ODM from 'json-database/main.js';

// Create Schema for Model
const Schema = ODM.Schema;
const UserSchema = new Schema({
    username: { type: 'string', required: true },
    password: { type: 'string', required: true },
    email: { type: 'string', required: true },
    firstName: { type: 'string', required: true },
    lastName: { type: 'string' },
    age: { type: 'number' },
    isActive: { type: 'boolean' }
});

// Create Model class bound to a JSON file
const User = ODM.model('user', UserSchema);

// Create new instance and save it
const newUser = new User({
    username: 'alice123',
    password: 'password',
    firstName: 'Alice',
    email: 'alice123@domain.com',
    age: 27
});
await newUser.save();

// Find by keys
const users = await User.find({ age: 27 });

// Find by ID
const userFoundByID = await User.findById(users[0]._id);

// Find by Operators
const usersFoundByOp = await User.find({ age: { $gt: 20 } });

// Update and delete
await User.findByIdAndUpdate(userFoundByID._id, { password: 'password1234' });
await User.findByIdAndDelete(userFoundByID._id);
```

## API Reference

### Model class methods
* `save()` — Saves current instance to JSON DB
* `static find(queryObject)` — Returns array of records matching all key-value pairs
* `static findById(id)` — Returns single record matching unique ID
* `static findOne(queryObject)` — Returns first record matching query
* `static findByIdAndUpdate(id, updatedKeys)` — Updates record with matching ID
* `static findOneAndUpdate(queryObject, updatedKeys)` — Updates first record matching query
* `static findByIdAndDelete(id)` — Deletes record by ID
* `static findOneAndDelete(queryObject)` — Deletes first record matching query

Notes and Limitations
* Update operation deletes then recreates the record; this is atomic in simple cases but not transactional.
* Designed for small local projects or prototyping.

Testing

* End-to-end — `npm run test:e2e`
* Integration — `npm run test:integration`
* Unit — `npm run test:unit`
