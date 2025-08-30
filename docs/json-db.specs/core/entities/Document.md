# Document

- [Document](#document)
  - [`class Document`](#class-document)
    - [`new Document(content)`](#new-documentcontent)
    - [`this.hasKeys(keys)`](#thishaskeyskeys)
    - [`this.mergeKeys(keys)`](#thismergekeyskeys)

[Index](../../index.md)

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

[Index](../../index.md)
