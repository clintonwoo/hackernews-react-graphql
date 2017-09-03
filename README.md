## Hacker News Clone  [![GitHub stars](https://img.shields.io/github/stars/clintonwoo/hackernews-react-graphql.svg?style=social&label=Star)](https://github.com/clintonwoo/hackernews-react-graphql/stargazers) [![GitHub followers](https://img.shields.io/github/followers/clintonwoo.svg?style=social&label=Follow)](https://github.com/clintonwoo/hackernews-react-graphql/) [![GitHub issues](https://img.shields.io/github/issues/clintonwoo/hackernews-react-graphql.svg)](https://github.com/clintonwoo/hackernews-react-graphql/issues) [![](https://img.shields.io/github/issues-pr-raw/clintonwoo/hackernews-react-graphql.svg)](https://github.com/clintonwoo/hackernews-react-graphql/pulls)

This project is a clone of hacker news rewritten with universal Javascript, using React and GraphQL. It is intended to be an example or boilerplate to help you structure your projects using production-ready technologies.

## Featuring
- React (UI Framework)
- GraphQL (Web Data API)
- Apollo (GraphQL Client)
- Next.js (Routing, SSR, Hot Module Reloading, Code Splitting, Build tool uses Webpack)
- Redux (State Management)
- Node.js (Web Server)
- Express (Web App Server)
- Passport.js (Authentication)
- Babel (JS Transpiling)
- Flow (Static Types)
- ESLint (JS Best Practices/Code Highlighting)
- Jest (Tests)

## Benefits
Front End
- Declarative UI (react)
- Flux State Management (redux)
- GraphQL Query Colocation (react-apollo)

Server
- Universal JS (node & express)
- Declarative GraphQL Schema (react-tools)
- GraphQL Query Batching (apollo-server-express)
- GraphQL Stored Queries (apollo-server-express)
- Easy GraphiQL Include (apollo-server-express)
- Local Authentication Strategy (passport)
- Server Side Rendering (next)
- Code Splitting (next)
- Build to Static Website (next)

Dev/Test
- Hot Module Reloading (next)
- Snapshot Testing (jest)

## One Click Download

You can download and run the repo with one command to rule them all:

`git clone https://github.com/clintonwoo/hackernews-react-graphql.git && cd hackernews-react-graphql && npm install && npm run dev`

## How To Start

`npm install`

`npm run dev`

## Configuration

You can include a .env file in your project root to configure settings (this is the 'dotenv' npm package). The project runs out of the box with default settings. Config is in the /src/config.js file. This .env file is included in .gitignore.

## How To Test

`npm test` or `npm run test`

This project uses Jest as a testing framework. Jest can do snapshot testing of react components. Whenever a component is updated to a functioning up-to-date state, please update the snapshots using `npm test -- -u` or `jest --updateSnapshot`.

## How To Deploy

If you just want to generate build files: `npm run build`

`npm run deploy`

## Contributing
Pull requests are welcome. File an issue for ideas, conversation or feedback.

## License
Apache 2.0 License. Copyright © 2017, Clinton D'Annolfo. All rights reserved.

## Community
After you ★Star this project, follow [@ClintonDAnnolfo](https://twitter.com/clintondannolfo) on Twitter.
