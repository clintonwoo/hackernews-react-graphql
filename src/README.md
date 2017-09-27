### Directory Structure

*src* - Source code
- *\_\_tests__*: Jest tests colocated in each folder.
- *.next*: Next build files containing code-split modules and assets.
- *components*: React components with GraphQL fragments colocated in-file.
- *data*: GraphQL Schema, HN Web APIs, cache, sample data.
- - *models*: Data model. Used to create, fetch and set data eg. in GraphQL schema resolvers.
- *helpers*: Helper functions and classes.
- *layouts*: Every page uses a layout. It's a React component that can take children.
- *pages*: React components served by Next as routes using file name in the app.
- *static*: Static resources eg. favicon, css, gif.
- The current folder contains config files and the app entry point *server.js*.