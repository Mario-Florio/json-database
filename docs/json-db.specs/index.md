# Index

## Core

### [Entities](./core/entities/entities.md)
* [Document](./core/entities/entities.md#class-document)
    * constructor
    * hasKeys
    * mergeKeys
* [Schema](./core/entities/entities.md#class-schema)
    * constructor
    * validateDoc
* QueryBuilder
    * matches
* ChunkReader

### [Use Cases](./core/use-cases/usecases.md)
* [DocumentRepoUseCase](./core/use-cases/usecases.md#class-documentrepousecase)
    * constructor
    * implementsInterface
* [FindOneDocument](./core/use-cases/usecases.md#class-findonedocument-extends-documentrepousecase)
    * execute
* [FindDocuments](./core/use-cases/usecases.md#class-finddocuments-extends-documentrepousecase)
    * execute
* [SaveDocument](./core/use-cases/usecases.md#class-savedocument-extends-documentrepousecase)
    * execute
* [UpdateDocument](./core/use-cases/usecases.md#class-updatedocument-extends-documentrepousecase)
    * execute

## Interface Adapters

### [Controllers](./adapters/controllers/controllers.md)
* [DocumentController](./adapters/controllers/controllers.md#documentcontroller)
    * getOneDocument
    * getDocuments
    * createDocument
    * updateDocument
    * deleteDocument

### [Repositories](./adapters/repositories/repositories.md)
* [DocumentRepository](./adapters/repositories/repositories.md#class-documentrepository)
    * constructor
    * create
    * read
    * update

----

### [Appendix](./appendix.md)
* Common Expressions
