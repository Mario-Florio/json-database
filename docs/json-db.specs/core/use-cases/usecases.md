# Use Cases

- [Use Cases](#use-cases)
  - [`class DocumentRepoUseCase`](#class-documentrepousecase)
    - [`new DocumentRepoUseCase(documentRepository)`](#new-documentrepousecasedocumentrepository)
    - [`implementsInterface(instance, InterfaceClass)`](#implementsinterfaceinstance-interfaceclass)
  - [`class FindOneDocument extends DocumentRepoUseCase`](#class-findonedocument-extends-documentrepousecase)
    - [`this.execute(paramObj)`](#thisexecuteparamobj)
  - [`class FindDocuments extends DocumentRepoUseCase`](#class-finddocuments-extends-documentrepousecase)
    - [`this.execute(paramObj)`](#thisexecuteparamobj-1)
  - [`class SaveDocument extends DocumentRepoUseCase`](#class-savedocument-extends-documentrepousecase)
    - [`this.execute(paramObj)`](#thisexecuteparamobj-2)
  - [`class UpdateDocument extends DocumentRepoUseCase`](#class-updatedocument-extends-documentrepousecase)
    - [`this.execute(paramObj)`](#thisexecuteparamobj-3)

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

----

## `class FindOneDocument extends DocumentRepoUseCase`

### `this.execute(paramObj)`

**Description:**
Filters out single `Document` from `DocumentRepository`.

**Inputs (Constraints / Preconditions):**
- `paramObj` is non-array object
- `paramObj` contains props:
    - `keys` — is non-array object
- Input is trusted to have gone through basic validation at *controller*

**Output (Postconditions):**
- Returns a non-array object
  - Contains `message` & `success` properties
  - Contains `data` property with single instance of `Document` or `null`
    - Returned instance of `Document` has all *key-val* pairs in `keys`

**Invariants (Maintained System Properties):**
- `this.repo` always return an instance of `Document`

**Edge Cases:**
None are determined.

----

## `class FindDocuments extends DocumentRepoUseCase`

### `this.execute(paramObj)`

**Description:**
Filters many `Document`s from `DocumentRepository`.

**Inputs (Constraints / Preconditions):**
- `paramObj` is non-array object
- `paramObj` contains props:
    - `keys` — is non-array object
- Input is trusted to have gone through basic validation at *controller*

**Output (Postconditions):**
- Returns a non-array object
  - Contains `message` & `success` properties
  - Contains `data` property with an array of `Document`s
    - Every returned instance of `Document` has all *key-val* pairs in `keys`

**Invariants (Maintained System Properties):**
- `this.repo` always returns an array of `Document` instances

**Edge Cases:**
None are determined.

----

## `class SaveDocument extends DocumentRepoUseCase`

### `this.execute(paramObj)`

**Description:**
Determines that `Document` is a valid representation of `Schema` prior to saving.

**Inputs (Constraints / Preconditions):**
- `paramObj` is non-array object
- `paramObj` contains props:
    - `schema` — is instance of `Schema`
    - `data` — is non-array object
- Input is trusted to have gone through basic validation at *controller*

**Output (Postconditions):**
- If `Document` is invalid representation of `paramObj.schema`
    - returns non-array object with message and falsy success fields
- Else it returns `this.repo.create`s response

**Invariants (Maintained System Properties):**
- `paramObj.schema` is always an instance of `Schema`

**Edge Cases:**
None are determined.

----

## `class UpdateDocument extends DocumentRepoUseCase`

### `this.execute(paramObj)`

**Description:**
- Merges `updatedKeys` with `Document`
- Determines that `Document` is a valid representation of `Schema` prior to updating.

**Inputs (Constraints / Preconditions):**
- `paramObj` is non-array object
- `paramObj` contains props:
    - `schema` — is instance of `Schema`
    - `_id` — is type string
    - `data` — is non-array object
    - `updatedKeys` — is non-array object
- Input is trusted to have gone through basic validation at *controller*

**Output (Postconditions):**
- If `Document` is invalid representation of `paramObj.schema`
    - returns non-array object with message and falsy success fields
- Else it returns `this.repo.create`s response

**Invariants (Maintained System Properties):**
- `paramObj.schema` is always an instance of `Schema`

**Edge Cases:**
- `updatedKeys` contain no *key-val* pairs

----

[Index](../../index.md)
