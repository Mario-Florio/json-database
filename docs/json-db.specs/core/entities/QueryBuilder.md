# Query Builder

- [Query Builder](#query-builder)
  - [`class QueryBuilder`](#class-querybuilder)
    - [`new QueryBuilder(filter)`](#new-querybuilderfilter)
    - [`this.matches(doc)`](#thismatchesdoc)

[Index](../../index.md)

----

## `class QueryBuilder`

### `new QueryBuilder(filter)`

**Description:**
Stores filter condition to be applied to `Documents`.

**Inputs (Constraints / Preconditions):**

- `filter` is non-array object

**Output (Postconditions):**

- `this.filter` is non-array object

**Invariants (Maintained System Properties):**
None explicitly maintained by this constructor.

**Edge Cases:**
None identified.

----

### `this.matches(doc)`

**Description:**
Applies query filter to specified `Document`.

**Inputs (Constraints / Preconditions):**

- `this.filter` is non-array object
- `this.filter` uses proper types (according to schema)
- `doc` is instance of `Document`

**Output (Postconditions):**

- Returns *true* if:
  - Query condition is met
- Returns *false* if:
  - Query condition fails

**Invariants (Maintained System Properties):**
None explicitly maintained by this constructor.

**Edge Cases:**
None are determined.

----

[Index](../../index.md)
