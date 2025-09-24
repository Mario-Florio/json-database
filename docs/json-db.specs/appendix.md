
# Appendix

- [Appendix](#appendix)
  - [Glossary / Terms](#glossary--terms)

## Glossary / Terms

| Condition              | Expression |
|------------------------|------------|
| Boolean type           | `typeof val === 'boolean'` |
| Number type            | `typeof val === 'number' && !Number.isNaN(val)` |
| String type            | `typeof val === 'string'`  |
| Whole number           | `Number.isInteger(val)` |
| Non-array object       | `typeof obj === 'object' && obj !== null && !Array.isArray(obj)` |
| Function               | `typeof obj === 'function'` |
| Generator object       | `typeof obj.next === 'function' && typeof obj.throw === 'function'` |

----

[Index](./index.md)