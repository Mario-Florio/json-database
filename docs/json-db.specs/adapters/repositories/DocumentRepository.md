# Document Repository

- [Document Repository](#document-repository)
  - [`class DocumentRepository`](#class-documentrepository)
    - [`new DocumentRepository(collectionName)`](#new-documentrepositorycollectionname)
    - [`this.create(operationObj)`](#thiscreateoperationobj)
    - [`this.read(operationObj)`](#thisreadoperationobj)
    - [`this.update(operationObj)`](#thisupdateoperationobj)

----

## `class DocumentRepository`

### `new DocumentRepository(collectionName)`

**Description:**

- Mediation layer between *core* and *database*
- Standardizes data shape & format

**Inputs (Constraints / Preconditions):**

- `collectionName` type is string
- Input is trusted to have gone through basic validation at *controller*

**Output (Postconditions):**
- `this.#db` is a `DB` instance with access to specified collection

**Invariants (Maintained System Properties):**
None explicitly maintained by this constructor.

**Edge Cases:**
None are determined.

----

### `this.create(operationObj)`

**Description:**
Calls `this.#db` to add `Document` to database storage.

**Inputs (Constraints / Preconditions):**

- `operationObj` is instance of `Operation`
- `operationObj.type` is `Operation.types.SAVE_DOCUMENT`
- `operationObj.payload` contains props:
    - `document` – is instance of `Document`
- Input is trusted to have gone through basic validation at *controller*

**Output (Postconditions):**

- Returns a non-array object
    - contains `message` & `success` properties

**Invariants (Maintained System Properties):**

- *Use Case* always inputs `Document` instances

**Edge Cases:**
None are determined.

----

### `this.read(operationObj)`

**Description:**
Calls `this.#db` to return `Document` collection in database storage.

**Inputs (Constraints / Preconditions):**
- `operationObj` is instance of `Operation`
- `operationObj.type` is `Operation.types.GET_DOCUMENTS` or `Operation.types.GET_ONE_DOCUMENT`

**Output (Postconditions):**
- Returns a non-array object
  - contains `message` & `success` properties
  - contains `generator` object yeilding promises for `Document`s

**Invariants (Maintained System Properties):**
None are explicitly maintained by this method.

**Edge Cases:**
None are determined.

----

### `this.update(operationObj)`

**Description:**
Calls `this.#db` to update existing `Document` in database storage.

**Inputs (Constraints / Preconditions):**

- `operationObj` is instance of `Operation`
- `operationObj.type` is `Operation.types.UPDATE_DOCUMENT`
- `operationObj.payload` contains props:
    - `_id` – is type string
    - `updatedDoc` must be instance of `Document`
- Input is trusted to have gone through basic validation at *controller*

**Output (Postconditions):**

- Returns a non-array object
    - contains `message` & `success` properties

**Invariants (Maintained System Properties):**

- *Use Case* always inputs `Document` instances

**Edge Cases:**
None are determined.

----

[Index](../../index.md)