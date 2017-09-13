# Artisan
An unopinionated model layer / ORM for full-stack Javascript Applications (web, mobile, desktop).  Will serve as the base layer for Partisan (the opinionated full-stack version of Artisan).

## Features

1. Full stack javascript, written in standard ES6
2. Backend and frontend framework-independent
3. Uses the [Adapter Pattern](https://en.wikipedia.org/wiki/Adapter_pattern) for all of the APIs it uses.  Each adapter would be a seperate package.
  1. Database-Server Adapters
     1. Postgres
     2. Mongo
     3. Redis
  2. Client-Server API Level Adapters
     1. REST (HTTP)
     2. WebSockets
     3. GraphQL
  3. Client Server View Layer Adapters
     1. UI Logic: Angular, React, Vue, Elm
     2. State management libraries: flux, redux, vuex
  4. Misc. Adapters
     1. Authentication Adapters (like Passport, Social Auth, LDAP, etc)   
4. Artisan API is identical on server and client.  This leads to an Isomporhic model layer that can be written on either the front-end or the back-end, though in most cases the models/schema would be defined server-side and the queries would be written client-side.
5. Artisan API adheres to the [Active Record Pattern](https://en.wikipedia.org/wiki/Active_record_pattern).

## Specifications

1. Able to define a model schema (properties) and methods natively
2. Able to extend schemas from other model layers, for example I have an existing mongo schema I want to connect.
3. Has a full active record style set of default methods that can be applied to any model.  Feel free to change the method names to something that sounds more java-scripty.  Just getting the idea across.  Each method should return a promise by default.  Ideally some syntactic sugar to covert these to sycnh functions using async/await would be helpful, like a decorator or chained method.
1. Adapters: Query Methods
    - Standard
        - `create([{data}])`
        - `read([{queries}])`
        - `update([{queries}], [{data}])`
        - `destroy([{queries}], [{data}])`
    - Proposed
2. Model: Query Methods 
    - Standard
        - `create({data})` -> creates one instance
        - `create([{data}])` -> creates many instances
        - `read({query})` -> returns a single instance
        - `read([{queries}])` -> returns array of instances (empty array returns all instances)
        - `update({query}, {data})` -> updates one instance
        - `update([{queries}], [{data}])` -> updates many instances (empty query array updates all instances)
        - `destroy({queries}, {data})` -> destroys one instance
        - `destroy([{queries}], [{data}])` -> destroys many instances (empty query array updates all instances)
    - Proposed
        - `first()` -> returns first instance of model
        - `last()` -> returns last instance of model
3. Model: Event Hook Methods
    - Standard
        - `beforeCreate()`
        - `afterCreate()`
        - `beforeRead()`
        - `afterRead()`
        - `beforeUpdate()`
        - `afterUpdate()`
        - `beforeDestroy()`
        - `afterDestroy()`
    - Proposed
        - `beforeSave()`
        - `afterSave()`
4. How to handle relations?
    1. Should relations be defined implicity in the schema or explicitly in the methods?
    2. How will through/nested relationships be handled?

## Plan of Attack

Define a basic benchmarking app (BOM tracker) and incrementally build out to the desired stack.

### Benchmarking Experiment

Build a BOM App: a twist on the standard ToDo Example, using a Bill of Materials (BOM), like a shoppping cart, instead of a to do list.

1. Just a simple non-versioned, flat BOM to start.
2. Two basic notions
   1. Parts
   2. Parts List (BOM)
3. Actions
   1. Create a new BOM
   2. Create a new part
   3. Add a a part to a BOM (new part or existing part)
