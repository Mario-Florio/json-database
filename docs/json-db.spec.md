# JSON Database Specifications

## Function Index

* [Document](#class-document)
    * [constructor](#new-documentcontent)
    * [hasKeys](#thishaskeyskeys)
    * [mergeKeys](#thismergekeyskeys)
* [Schema](#class-schema)
    * [constructor](#new-schemakeymetadata)
    * [validateDoc](#thisvalidatedocdocument)
* [DocumentRepoUseCase](#class-documentrepousecase)
    * [constructor](#new-documentrepousecasedocumentrepository)
    * [implementsInterface](#implementsinterfaceinstance-interfaceclass)

----

## `class Document`

### `new Document(content)`

**Description:**
Builds universal document structure.

**Inputs (Constraints / Preconditions):**

- `content` is non-array object

**Output (Postconditions):**

- `for (const key of Object.keys(this))`
    - `this[key] === content[key]`
- `Object.keys(this).length === Object.keys(content).length`
- No other properties exist on the constructed object

**Invariants (Maintained System Properties):**
None explicitly maintained by this constructor.

**Edge Cases:**
None identified.

----

### `this.hasKeys(keys)`

**Description:**
Asserts whether `this` has specified key value pairs.

**Inputs (Constraints / Preconditions):**

- `keys` is non-array object

**Output (Postconditions):**

- Return type is boolean
- Returns `true` if all `key: value` pairs in `keys` exist in `this` and are structurally equal (deep equality) <a href="#hasKeys-1" style="font-size: 0.8rem">1</a>

**Invariants (Maintained System Properties):**
No mutation to `this` (pure function).

**Edge Cases:**

- If `keys[key]` is an object or array, deep comparison is required

**Refs:**

- <span name="hasKeys-1" id="hasKeys-1">1</span> `for (const key of keys)`
    - `Object.keys(this).includes(key) &&` 
    - `JSON.stringify(this[key]) === JSON.stringify(keys[key])` *(naïve reference only)*

----

### `this.mergeKeys(keys)`

**Description:**

- Overwrites current key values of `this` with provided key values.
- Adds additional key values (if provided).

**Inputs (Constraints / Preconditions):**

- `keys` is non-array object
    - Throws `TypeError` if input fails this condition

**Output (Postconditions):**

- `this` is mutatated — provided key values:
    - overwrite corresponding existing keys
    - add new keys

- Return value is:
    - a non-array object
    - an instance of `Document`

- does not modify `constKeys` <a href="#mergeKeys-1" style="font-size: 0.8rem">1</a>

**Invariants (Maintained System Properties):**
None are explicitly maintained in this method.

**Edge Cases:**

- If `keys` contain `constKeys` (<a href="#mergeKeys-1" style="font-size: 0.8rem">1</a>), do not modify `key` value

**Refs:**

- <span name="mergeKeys-1" id="mergeKeys-1">1</span> `constKeys = '_id', 'createdAt'`

----

## `class Schema`

### `new Schema(keyMetaData)`

**Description:**
Builds metadata schematic for documents.

**Inputs (Constraints / Preconditions):**

- `keyMetaData` is non-array object
- For each *field* in `keyMetaData`:
    - *field* is a non-array object
    - *field* does not contain invalid properties (see valid properties <a href="#newSchema-1" style="font-size: 0.8rem">1</a>)
    - *field* contains required properties <a href="#newSchema-2" style="font-size: 0.8rem">2</a>
    - *field* type is valid type <a href="#newSchema-3" style="font-size: 0.8rem">3</a>

- Throws error if input fails above conditions

**Output (Postconditions):**

- For each *field* in `this` (return value):
    - *field* is a non-array object
    - *field* does not contain invalid properties (see valid properties <a href="#newSchema-1" style="font-size: 0.8rem">1</a>)
    - *field* contains required properties <a href="#newSchema-2" style="font-size: 0.8rem">2</a>
    - *field* type is valid type <a href="#newSchema-3" style="font-size: 0.8rem">3</a>
- `this` does not contain `constKeys` <a href="#newSchema-4" style="font-size: 0.8rem">4</a>

**Invariants (Maintained System Properties):**

- All `this` fields:
    - types are non-array objects
    - contain a type property specifying a valid type <a href="#newSchema-1" style="font-size: 0.8rem">1</a>

**Edge Cases:**
None have been determined.

**Refs:**

- <span name="newSchema-1" id="newSchema-1">1: valid properties</span>
    - `type`
    - `required`

- <span name="newSchema-2" id="newSchema-2">2: required properties</span>
    - `type`

- <span name="newSchema-3" id="newSchema-3">3: valid types</span>
    - `string`
    - `number`
    - `boolean`
    - `null`
    - `object`
    - `array`

- <span name="newSchema-4" id="newSchema-4">4: const keys</span>
    - `_id`
    - `createdAt`

----

### `this.validateDoc(document)`

**Description:**
Asserts if `document` is valid representation of schema (`this`).

**Inputs (Constraints / Preconditions):**

- `document` is instance of `Document`

**Output (Postconditions):**

- Returns type is boolean
- If return is `true`:
    - All fields marked `required` must be present in `document` <a href="#validateDoc-1" style="font-size: 0.8rem">1</a>
    - All present fields in `document` match the expected `type` in schema <a href="#validateDoc-2" style="font-size: 0.8rem">2</a>

**Invariants (Maintained System Properties):**
None are explicity maintained by this method.

**Edge Cases:**
None are determined.

**Refs:**

- <span name="validateDoc-1" id="validateDoc-1">1</span> `for (const key of Object.keys(this)) this[key].required && document[key] !== undefined`

- <span name="validateDoc-2" id="validateDoc-2">2</span> `for (const key of Object.keys(this)) this[key].required && this[key].type() === typeof document[key]`

----

## `class DocumentRepoUseCase`

### `new DocumentRepoUseCase(documentRepository)`

**Description:**
Base class for document repository use cases.

**Inputs (Constraints / Preconditions):**

- Implements `IDocumentRepository` interface

**Output (Postconditions):**

- `this.#repo` is assigned to the provided `documentRepository` instance
- `documentRepository` implements the `IDocumentRepository` interface

**Invariants (Maintained System Properties):**

- `this.#repo` always implements `IDocumentRepository` interface
- `this.#repo.read` always returns array of `Document`s

**Edge Cases:**
None are determined.

----

### `implementsInterface(instance, InterfaceClass)`

**Description:**
Asserts if `instance` implements `InterfaceClass`.

**Inputs (Constraints / Preconditions):**
- `instance` properties must be recognized within its prototype chain
    - Returns `false` if input fails above condition (even object does implement interface)

**Output (Postconditions):**
- Returns type is boolean
- Returns `false` if:
    - `instance` type is not a non-array object
    - `InterfaceClass` type is not a non-array object
    - for each *key* (except `constructor`) in `InterfaceClass.prototype`:
        - `Object.getPrototypeOf(instance)` does not contian *key*
        - if `InterfaceClass.prototype[key]` type is function and `Object.getPrototypeOf(instance)[key]` type is not function

**Invariants (Maintained System Properties):**
None are explicitly maintained by this function.

**Edge Cases:**
- `instance` does not implement arguments of `interfaceClass`s methods

## Appendix: Common Expressions

| Condition               | Expression |
|------------------------|------------|
| Boolean type           | `typeof val === 'boolean'` |
| Number type            | `typeof val === 'number' && !Number.isNaN(val)` |
| Whole number           | `Number.isInteger(val)` |
| Non-array object       | `typeof obj === 'object' && obj !== null && !Array.isArray(obj)` |
