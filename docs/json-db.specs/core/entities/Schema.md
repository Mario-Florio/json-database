# Schema

- [Schema](#schema)
  - [`class Schema`](#class-schema)
    - [`new Schema(keyMetaData)`](#new-schemakeymetadata)
    - [`this.validateDoc(document)`](#thisvalidatedocdocument)

[Index](../../index.md)

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

[Index](../../index.md)