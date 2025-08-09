# JSON Database

A lightweight JSON file–based database wrapper providing a simple ODM-like interface for Node.js projects.

**This library is intended for local hobby projects, prototyping, or educational purposes to mock simple Mongoose/MongoDB-like methods. It is not designed for production use or serious data handling.**

## Overview

This project exposes a `Model` class which acts as an API for CRUD operations on a JSON file. The low-level file operations are handled by the `DB` class internally; users interact only with the `Model` class through its subclasses (which allow for customization of properties).

## Features

- Simple JSON file persistence for local projects
- ORM-like static methods for querying (`find`, `findById`, `findOne`, etc.)
- Instance methods for creating and saving records
- Flexible querying by arbitrary keys
- Automatically generates unique IDs and timestamps for new records

## Setup

Copy the `database/DB.js` and `models/ORM/Model.js` files into your project or include as a dependency.

## Usage

```javascript
const ODM = require('json-database/ODM/ODM.js');

// Create Schema for Model
const Schema = ODM.Schema;
const UserSchema = new Schema({
    username: { type: 'string', required: true },
    password: { type: 'string', required: true },
    email: { type: 'string' },
    firstName: { type: 'string', required: true },
    lastName: { type: 'string', required: true }
});

// Create base Model class bound to a JSON file
const UserModel = ODM.model('user', UserSchema);

// Define your model by extending the base class
class User extends UserModel {
    constructor({ username, password, email, firstName, lastName }) {
        super();
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    get fullName = function() {
        return `${this.firstName} ${this.lastName}`;
    }
}

// Setup model to instantiate query results
UserModel.setupModel(User);

// Create new instance and save it
const user = new User({
    username: 'username',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName'
});
user.save();

// Query by keys
const users = User.find({ username: 'username' });

// Find by ID
const userFoundByID = User.findById(user._id);

// Update and delete
User.findByIdAndUpdate(user._id, { password: 'password1234' });
User.findByIdAndDelete(user._id);
```

**Disclaimer: *Base models (e.g. `UserModel`) create a closure-scoped, JSON file singletons. Each base model should only have one sub class (e.g. `User`), used for customizing properties. Multiple model extensions will cause data mutation.***

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
* The DB uses synchronous file I/O; performance may degrade on large datasets.
* Update operation deletes then recreates the record; this is atomic in simple cases but not transactional.
* No concurrency control; simultaneous writes may cause data corruption.
* Designed for small local projects or prototyping.

Testing

End-to-end tests are provided and can be ran via shell script `e2e.test.sh`.
