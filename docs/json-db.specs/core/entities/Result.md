# Result

- [Result](#result)
  - [`Result(paramObj)`](#resultparamobj)
    - [`this.setGen(gen)`](#thissetgengen)

[Index](../../index.md)

----

## `Result(paramObj)`

### `this.setGen(gen)`

**Description:**
Sets generators used by query use cases to manage data stream.

**Inputs (Constraints / Preconditions):**
- `gen` is a generator object

**Output (Postconditions):**
- `this.#gen` is a generator object

**Invariants (Maintained System Properties):**
- If `Result.gen` is defined, it is always a generator object

**Edge Cases:**
None determined.

----

[Index](../../index.md)
