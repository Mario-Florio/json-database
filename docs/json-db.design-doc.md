# Design Doc: JSON Database Refactor (Clean Architecture)

- [Design Doc: JSON Database Refactor (Clean Architecture)](#design-doc-json-database-refactor-clean-architecture)
  - [Overview \& Purpose](#overview--purpose)
  - [Architecture](#architecture)
    - [Flow Chart](#flow-chart)
    - [Dependency Inversion](#dependency-inversion)
  - [Clean Architecture Mapping Summary](#clean-architecture-mapping-summary)
    - [Entities](#entities)
    - [Use Cases](#use-cases)
    - [Ports](#ports)
    - [Interface Adapters](#interface-adapters)
    - [Frameworks/Drivers (External Agents)](#frameworksdrivers-external-agents)
  - [Issues](#issues)
  - [Future Installments](#future-installments)

## Overview & Purpose
JSON Database serves as a pseudo-mongo/mongoose ODM for local development. The project exposes a simple API which allows for model creation. These created models provide basic query methods which allow for interaction with the underlying database.

## Architecture
```
+------------+ +------------+
| ODM Client | | IO Service |
+------------+ +------------+
      |            ^
      v            |
+-----------------------------------------+
|            Interface Adpater            |
|+---------------------+ +---------------+|
|| Document Controller | | Document Repo ||
|+---------------------+ +---------------+|
+-----------------------------------------+
                  |
                  V
+------------------------------------+
|                Core                |
|+-----------+ +-------+ +----------+|
|| Use Cases | | Ports | | Entities ||
|+-----------+ +-------+ +----------+|
+------------------------------------+
```

### Flow Chart
```
Client ->
    Controller ->
        Use Case ->
            Repository ->
                IO Service
```

### Dependency Inversion
```
Use Case -> IRepository.fn();
                ^
                |
            Repository.fn();
```

## Clean Architecture Mapping Summary

JSON Databases architecture utilizes CA layers to abstract core logic (i.e. data filtering & document structure) and divert dependencies. *Entities* handle business logic central to the domain. *Use Cases* serve central domain without depending on implementation details. *Interface Adapters* invert dependencies from the core through dependency injection, and enforce contracts on data shape from *external agents*.

### Entities
  * `Document` — Core structure of individual data units; standardizes *cores* data handling
  * `Schema` — Responsible for determing data uniformity across collections of `Document`s; determines `Document` identity
  * `QueryBuilder` — Responsible for data filtering
  * `DocReader` — Responsible for data transimssion logic (I.e. data stream handling) and transformation of data shape
  * `Result` — Standardizes response objects across project; changes are centralized

### Use Cases
Use Cases handle core logic associated with data filtering and document handling:

  * `InstantiateCollection` — Links controller to IO API; setup as container for any business logic that may take place in this pipeline in the future (can be removed if absolutely sure no logic will be placed here in future)
  * `FindDocuments` — Query logic; filters `Documents` according to conditional input; returns all matches
  * `FindOneDocument` — Query logic; filters `Documents` according to conditional input; returns first match
  * `SaveDocument` - Enforces `Schema` contract on `Document`s
  * `UpdateDocument` - Merges update data with initial data; enforces schema contract
  * `DeleteDocument` - Links controller to IO API; same as `InstantiateCollection`, mainly serves as a route which can house future core logic that takes place in the delete document pipeline

### Ports
  * `IDocumentRepository` — Standard interface for *Use Cases* to be mapped to; enforces contract on *Interface/Adapters* `DocumentRepository`

### Interface Adapters
  * `DocumentController` — Maps client request to *Use Cases* and injects repository dependency
  * `DocumentRepository` — Accesses IO API and standardizes output into `Document`s for *Use Case* layer; inverts dependency (IO Service)

### Frameworks/Drivers (External Agents)
  * `ODM` — Client ODM API which utilizes JSON DB for storage and data filtering
  * `DB` — IO API for managing persistent storage, accessing `IO_Service`, and parsing raw data to JavaScript objects
    * `IO_SERVICE` — IO Service which handles reads and writes 

## Issues
  * ODM API is treated as an external client, but serves as a controller, orchestrating `DocumentController` functions—this is not an issue in itself, but if the ODM API is to be treated as central to the project, it should be further integrated into the layers and not treated as an external agent.
  * Database performs dangerous and unperformant rewrites when modifying data.

## Future Installments
  * Implement streaming for file reads to improve performance and address safety concerns.
  * Implement backup storage to further improve data safety.
