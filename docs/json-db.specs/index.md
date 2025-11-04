# Index

## Core

### Entities
- [Document](./core/entities/Document.md)
    - [constructor](./core/entities/Document.md#new-documentcontent)
    - [hasKeys](./core/entities/Document.md#thishaskeyskeys)
    - [mergeKeys](./core/entities/Document.md#thismergekeyskeys)
- [Schema](./core/entities/Schema.md)
    - [constructor](./core/entities/Schema.md#new-schemakeymetadata)
    - [validateDoc](./core/entities/Schema.md#thisvalidatedocdocument)
- [QueryBuilder](./core/entities/QueryBuilder.md)
    - [constructor](./core/entities/QueryBuilder.md#new-querybuilderfilter)
    - [matches](./core/entities/QueryBuilder.md#thismatchesfilter)
- [DocReader](./core/entities/DocReader.md)
    - [constructor](./core/entities/DocReader.md#new-docreadergenerator-transformfn--doc--doc)
    - [read](./core/entities/DocReader.md#thisread)
- [Operation](./core/entities/Operation.md)
    - [constructor](./core/entities/Operation.md#new-operation-type-collectionid-payload-)
    - [payload setter](./core/entities/Operation.md#set-payloaddata)
- [Result](./core/entities/Result.md)
    - [setGen](./core/entities/Result.md#thissetgengen)

### [Use Cases](./core/use-cases/usecases.md)
- [DocumentRepoUseCase](./core/use-cases/usecases.md#class-documentrepousecase)
    - [constructor](./core/use-cases/usecases.md#new-documentrepousecasedocumentrepository-logtaskdispatcher)
    - [implementsInterface](./core/use-cases/usecases.md#implementsinterfaceinstance-interfaceclass)
- [FindOneDocument](./core/use-cases/usecases.md#class-findonedocument-extends-documentrepousecase)
    - [execute](./core/use-cases/usecases.md#thisexecuteoperationobj)
- [FindDocuments](./core/use-cases/usecases.md#class-finddocuments-extends-documentrepousecase)
    - [execute](./core/use-cases/usecases.md#thisexecuteoperationobj-1)
- [SaveDocument](./core/use-cases/usecases.md#class-savedocument-extends-documentrepousecase)
    - [execute](./core/use-cases/usecases.md#thisexecuteoperationobj-2)
- [UpdateDocument](./core/use-cases/usecases.md#class-updatedocument-extends-documentrepousecase)
    - [execute](./core/use-cases/usecases.md#thisexecuteoperationobj-3)

## Interface Adapters

### Controllers
- [Document Controller](./adapters/controllers/DocumentController.md)
    - [getOneDocument](./adapters/controllers/DocumentController.md#getonedocumentoperationobj)
    - [getDocuments](./adapters/controllers/DocumentController.md#getdocumentsoperationobj)
    - [createDocument](./adapters/controllers/DocumentController.md#createdocumentoperationobj)
    - [updateDocument](./adapters/controllers/DocumentController.md#updatedocumentoperationobj)
    - [deleteDocument](./adapters/controllers/DocumentController.md#deletedocumentoperationobj)

### Repositories
- [Document Repository](./adapters/repositories/DocumentRepository.md)
    - [constructor](./adapters/repositories/DocumentRepository.md#new-documentrepositorycollectionname)
    - [create](./adapters/repositories/DocumentRepository.md#thiscreateoperationobj)
    - [read](./adapters/repositories/DocumentRepository.md#thisreadoperationobj)
    - [update](./adapters/repositories/DocumentRepository.md#thisupdateoperationobj)

### Services
- [Logging Service](./adapters/services/LoggingService.md)
    - [LogTask](./adapters/services/LoggingService.md#class-logtask)
        - [constructor](./adapters/services/LoggingService.md#new-logtasklogger)
    - [LogTaskDispatcher](./adapters/services/LoggingService.md#class-logtaskdispatcher)
        - [dispatch](./adapters/services/LoggingService.md#thisdispatchlogtask-operation-args)

----

### [Appendix](./appendix.md)
- [Glossary / Terms](./appendix.md#glossary--terms)
