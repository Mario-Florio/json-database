# Document Controller

- [Document Controller](#document-controller)
  - [`documentController`](#documentcontroller)
    - [`getOneDocument(operationObj)`](#getonedocumentoperationobj)
    - [`getDocuments(operationObj)`](#getdocumentsoperationobj)
    - [`createDocument(operationObj)`](#createdocumentoperationobj)
    - [`updateDocument(operationObj)`](#updatedocumentoperationobj)
    - [`deleteDocument(operationObj)`](#deletedocumentoperationobj)

----

## `documentController`

### `getOneDocument(operationObj)`

**Description:**

Entry point to system:
- Sets up `DocumentRepository` and executes `FindOneDocument` *use case*
- Validates and sanitizes client input
- Handles errors

**Inputs (Constraints / Preconditions):**
- `operationObj` is instance of `Operation`
- `operationObj.type` is `Operation.TYPES.GET_ONE_DOCUMENT`
- `operationObj.payload` contains props:
    - `keys` — is non-array object

**Output (Postconditions):**
- Returns `Result` object
- If `Result.success` is true, `Result` contains:
    - `data` — instance of `Document` 
- If input constraints are violated, `Result.success` is false
- If *error* occurs:
    - If *error* is instance of `ContractError`, throws new `ContractError` with *error* message
    - Otherwise it returns non-array object with error message

**Invariants (Maintained System Properties):**
None are explicitly maintained by this function.

**Edge Cases:**
- Returns *non-array object* if `DocumentRepository` has not been instantiated
    - *non-array object* contains props:
        - `message` — type is string
        - `success` — type is boolean

----

### `getDocuments(operationObj)`

**Description:**

Entry point to system:
- Sets up `DocumentRepository` and executes `FindDocuments` *use case*
- Validates and sanitizes client input
- Handles errors

**Inputs (Constraints / Preconditions):**
- `operationObj` is instance of `Operation`
- `operationObj.type` is `Operation.TYPES.GET_DOCUMENTs`
- `operationObj.payload` contains props:
    - `keys` — is non-array object

**Output (Postconditions):**
- Returns `Result` object
- If `Result.success` is true, `Result` contains:
    - `data` — array of `Document` instances
- If input constraints are violated, `Result.success` is false
- If *error* occurs:
    - If *error* is instance of `ContractError`, throws new `ContractError` with *error* message
    - Otherwise it returns non-array object with error message

**Invariants (Maintained System Properties):**
None are explicitly maintained by this function.

**Edge Cases:**
- Returns *non-array object* if `DocumentRepository` has not been instantiated
    - *non-array object* contains props:
        - `message` — type is string
        - `success` — type is boolean

----

### `createDocument(operationObj)`

**Description:**

Entry point to system:
- Sets up `DocumentRepository` and executes `SaveDocument` *use case*
- Validates and sanitizes client input
- Handles errors

**Inputs (Constraints / Preconditions):**
- `operationObj` is instance of `Operation`
- `operationObj.type` is `Operation.TYPES.GET_DOCUMENTs`
- `operationObj.payload` contains props:
    - `data` — is non-array object
    - `schema` — is instance of `Schema`

**Output (Postconditions):**
- Returns a non-array object with:
    - `message` — type is string
    - `success` — type is boolean
- Returns *non-array object* if input constraints are violated
    - *non-array object* contains props:
        - `message` — type is string
        - `success` — type is boolean
- If *error* occurs:
    - If *error* is instance of `ContractError`, throws new `ContractError` with *error* message
    - Otherwise it returns non-array object with error message

**Invariants (Maintained System Properties):**
None are explicitly maintained by this function.

**Edge Cases:**
- Returns *non-array object* if `DocumentRepository` has not been instantiated
    - *non-array object* contains props:
        - `message` — type is string
        - `success` — type is boolean

----

### `updateDocument(operationObj)`

**Description:**

Entry point to system:
- Sets up `DocumentRepository` and executes `UpdateDocument` *use case*
- Validates and sanitizes client input
- Handles errors

**Inputs (Constraints / Preconditions):**
- `operationObj` is instance of `Operation`
- `operationObj.type` is `Operation.TYPES.GET_DOCUMENTs`
- `operationObj.payload` contains props:
    - `_id` — type is string
    - `data` — is non-array object
    - `schema` — is instance of `Schema`
    - `updatedKeys` — is non-array object

**Output (Postconditions):**
- Returns a non-array object with:
    - `message` — type is string
    - `success` — type is boolean
- Returns *non-array object* if input constraints are violated
    - *non-array object* contains props:
        - `message` — type is string
        - `success` — type is boolean
- If *error* occurs:
    - If *error* is instance of `ContractError`, throws new `ContractError` with *error* message
    - Otherwise it returns non-array object with error message

**Invariants (Maintained System Properties):**
None are explicitly maintained by this function.

**Edge Cases:**
- Returns *non-array object* if `DocumentRepository` has not been instantiated
    - *non-array object* contains props:
        - `message` — type is string
        - `success` — type is boolean

----

### `deleteDocument(operationObj)`

**Description:**

Entry point to system:
- Sets up `DocumentRepository` and executes `DeleteDocument` *use case*
- Validates and sanitizes client input
- Handles errors

**Inputs (Constraints / Preconditions):**
- `operationObj` is instance of `Operation`
- `operationObj.type` is `Operation.TYPES.GET_DOCUMENTs`
- `operationObj.payload` contains props:
    - `_id` — type is string

**Output (Postconditions):**
- Returns a non-array object with:
    - `message` — type is string
    - `success` — type is boolean
- Returns *non-array object* if input constraints are violated
    - *non-array object* contains props:
        - `message` — type is string
        - `success` — type is boolean
- If *error* occurs:
    - If *error* is instance of `ContractError`, throws new `ContractError` with *error* message
    - Otherwise it returns non-array object with error message

**Invariants (Maintained System Properties):**
None are explicitly maintained by this function.

**Edge Cases:**
- Returns *non-array object* if `DocumentRepository` has not been instantiated
    - *non-array object* contains props:
        - `message` — type is string
        - `success` — type is boolean

----

[Index](../../index.md)