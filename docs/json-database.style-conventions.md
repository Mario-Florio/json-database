# JSON Database - Styling Conventions

Pertaining to style conventions outside the scope of *prettier* & *eslint*.

## Import Hierarchy

Prioritization based on direct source:
1. Native Node packages (e.g. `fs`, `path`)
2. External packages (e.g. `lodash`)
3. *Core* modules
   1. *Entities*
   2. *Use Cases*
   3. *Ports*
4. *Adapters*
5. *Infrastructure*
6. *Utilities*
7. *Environmental*/*Config*
8. *Barrel files*

**Imports of the same priority:**
1. *Sub-class*
2. Logical (e.g. *first*, *second*, *last*; `must`, `uphold`, `guarantee`)
3. Alpha-numeric

## Export Declaration

Prioritize:
* **inline** exports
* **default** exports

***Note: Exported objects should organize contents in order they appeared in file.***

## Module Implementation

* Use `class` where instantiation is required
* Use files otherwise

## Utilities

1. Separate utility file if utilized across modules
2. Same-file utility if it depends on shared state (non-import related)
3. Same-file utility if shares 3+ imports
4. Separate utility file if file (w/ utilities) exceeds 100 lines
6. Same-file utility if utility has *helper-functions*

**Organization Hierarchy:**
* Same-file utilities are organized from most to least abstract (e.g. `class` -> extraction of logic into `function`), placed under a commented utility section (`// UTILS`)
* State or dispatch/register based utilities are placed at top of file (required by compilation)