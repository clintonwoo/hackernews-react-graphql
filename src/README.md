### Directory Structure

Nothing in this folder should import from the `pages` or `server` folder since code in here is intended to run on the client and server.

`src` - Source code

- `__tests__`: Jest tests colocated in each folder.
- `components`: React components with GraphQL fragments colocated in-file.
- `data`: GraphQL Schema, HN Web APIs, cache, sample data.
- - `models`: Data model objects . Used to create, fetch and set data eg. in GraphQL schema resolvers.
- `helpers`: Helper functions and classes.
- `layouts`: Every page uses a layout. It's a React component that can take children.
- The current folder contains a `config.ts` file for app config.
