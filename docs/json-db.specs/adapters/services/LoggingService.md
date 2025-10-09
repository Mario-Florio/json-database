# Logging Service

- [Logging Service](#logging-service)
  - [`class LogTask`](#class-logtask)
    - [`new LogTask(logger)`](#new-logtasklogger)
  - [`class LogTaskDispatcher`](#class-logtaskdispatcher)
    - [`this.dispatch(logTask, operation, ...args)`](#thisdispatchlogtask-operation-args)

## `class LogTask`

### `new LogTask(logger)`

**Description:**
Builds abstract log implementer.

**Inputs (Constraints / Preconditions):**
- `logger` is instance of `AbstractLogger`

**Output (Postconditions):**
  - `this.#logger` is assigned `logger` value

**Invariants (Maintained System Properties):**
None are explicitly maintained by this constructor.

**Edge Cases:**
None are determined.

----

## `class LogTaskDispatcher`

### `this.dispatch(logTask, operation, ...args)`

**Description:**
Dispatches logging tasks via `logTask.log`.

**Inputs (Constraints / Preconditions):**
- `logTask` is a *subclass* of `LogTask`

**Output (Postconditions):**
None are determined.

**Invariants (Maintained System Properties):**
None are explicitly maintained by this method.

**Edge Cases:**
None are determined.

----

[Index](../../index.md)