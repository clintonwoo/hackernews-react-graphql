### Directory Structure

*src* - Source code
- *\_\_tests__*: Used by Jest in each folder to colocate tests.
- *.next*: Next compiles things here.
- *components*: React reusable components with GraphQL fragments colocated in the file.
- *data*: GraphQL Schema, HN Web APIs, cache, sample data.
- - *models*: Data fetchers. Used to fetch data eg. in GraphQL schema resolvers.
- *helpers*: Helpers for Apollo SSR and calculating 'time ago'.
- *layouts*: Every page uses a layout. It's a React component that can have children put in it.
- *pages*: Every .js file in here contains a React component that is served by Next with the name of the file as a route in the app.
- *static*: Static resources eg. favicon, css, gif.
- *root* contains config files for app and Next. App entry point *server.js*.