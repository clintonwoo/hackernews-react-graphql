### Directory Structure

_src_ - Source code

- _\_\_tests\_\__: Jest tests colocated in each folder.
- _.next_: Next build files containing code-split modules and assets.
- _components_: React components with GraphQL fragments colocated in-file.
- _data_: GraphQL Schema, HN Web APIs, cache, sample data.
- - _models_: Data model. Used to create, fetch and set data eg. in GraphQL schema resolvers.
- _helpers_: Helper functions and classes.
- _layouts_: Every page uses a layout. It's a React component that can take children.
- _pages_: React components served by Next as routes using file name in the app.
- _static_: Static resources eg. favicon, css, gif.
- The current folder contains config files and the app entry point _server.js_.
