# Operation

- [Operation](#operation)
  - [`new Operation({ type, collectionId, payload })`](#new-operation-type-collectionid-payload-)
  - [`set payload(data)`](#set-payloaddata)

## `new Operation({ type, collectionId, payload })`

**Description:**
Builds parameter object for operation pipelines (accessed via `DocumentController`).

**Inputs (Constraints / Preconditions):**
- `type` is a valid `Operation` type
- `collectionId` is a string
- `payload` is a non-array object

**Output (Postconditions):**
- operator object instance includes:
  - `this.#id` – type string
  - `this.#type` - equivalent to `type` value
  - `this.#collectionId` – equivalent to `collectionId` value
  - `this.#payload` – equivalent to `payload` value
- `this.#id`, `this.#type`, and `this.#collectionId` are accessible to be read, not modified
- `this.#payload` is accessble to be read and modified

**Invariants (Maintained System Properties):**
None are explicitly maintained by this constructor.

**Edge Cases:**
None are determined.

----

## `set payload(data)`

**Description:**
- Setter for `this.#payload`
- Controls modifications to `this.#payload`

**Inputs (Constraints / Preconditions):**
- `data` is non-array object

**Output (Postconditions):**
- `data` is assigned to `this.#payload`

**Invariants (Maintained System Properties):**
- `#payload` is always a non-array object

**Edge Cases:**
None are determined.
