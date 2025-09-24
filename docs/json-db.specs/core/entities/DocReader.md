# Doc Reader

- [Doc Reader](#doc-reader)
  - [`class DocReader`](#class-docreader)
    - [`new DocReader(generator, transformFn = (doc) => doc)`](#new-docreadergenerator-transformfn--doc--doc)
    - [`this.read()`](#thisread)

[Index](../../index.md)

----

## `class DocReader`

### `new DocReader(generator, transformFn = (doc) => doc)`

**Description:**
Builds a generator handler to standardize use across layers.

**Inputs (Constraints / Preconditions):**
- `generator` is a generator object
- `transformFn` is a function

**Output (Postconditions):**
- Creates object with private `generator` and `transformFn` properties
- `generator` and `transformFn` are only accessible via `read` method

**Invariants (Maintained System Properties):**
- None explicitly maintained by this constructor

**Edge Cases:**
None identified.

### `this.read()`

**Description:**
- Returns generator object for layer to consume.
- Invokes transformation inherently

**Inputs (Constraints / Preconditions):**
None determined.

**Output (Postconditions):**
- Yields promises for generator objects

**Invariants (Maintained System Properties):**
None are explicitly maintained by this method.

**Edge Cases:**
None identified.

----

[Index](../../index.md)