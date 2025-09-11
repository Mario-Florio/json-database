# Document Repository

- [Document Repository](#document-repository)
  - [`class DocumentRepository`](#class-documentrepository)
    - [`new DocumentRepository(collectionName)`](#new-documentrepositorycollectionname)
    - [`this.create(document)`](#thiscreatedocument)
    - [`this.read()`](#thisread)
    - [`this.update(_id, updatedDoc)`](#thisupdate_id-updateddoc)

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

### `this.create(document)`

**Description:**
Calls `this.#db` to add `Document` to database storage.

**Inputs (Constraints / Preconditions):**

- `document` must be instance of `Document`
- Input is trusted to have gone through basic validation at *controller*

**Output (Postconditions):**

- Returns a non-array object
    - contains `message` & `success` properties

**Invariants (Maintained System Properties):**

- *Use Case* always inputs `Document` instances

**Edge Cases:**
None are determined.

----

### `this.read()`

**Description:**
Calls `this.#db` to return `Document` collection in database storage.

**Inputs (Constraints / Preconditions):**
None are determined.

**Output (Postconditions):**
- Returns a non-array object
  - contains `message` & `success` properties
  - contains `generator` object yeilding `Document`s

**Invariants (Maintained System Properties):**
None are explicitly maintained by this method.

**Edge Cases:**
None are determined.

----

### `this.update(_id, updatedDoc)`

**Description:**
Calls `this.#db` to update existing `Document` in database storage.

**Inputs (Constraints / Preconditions):**

- `_id` type is string
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