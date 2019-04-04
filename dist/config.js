"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphQLPath = '/graphql';
exports.graphiQLPath = '/graphiql';
exports.dev = process.env.NODE_ENV !== 'production';
exports.appPath = process.env.NODE_ENV === 'production' ? './build/app' : './src';
exports.HN_DB_URI = process.env.DB_URI || 'https://hacker-news.firebaseio.com';
exports.HN_API_VERSION = process.env.HN_API_VERSION || '/v0';
exports.HN_API_URL = process.env.HN_API_URL || "" + exports.HN_DB_URI + exports.HN_API_VERSION;
exports.HOST_NAME = process.env.HOST_NAME || 'localhost';
exports.APP_PORT = process.env.APP_PORT || 3000;
exports.HOST = (process.browser && window.location.host) || exports.HOST_NAME + ":" + exports.APP_PORT;
exports.APP_URI = "http://" + exports.HOST;
exports.GRAPHQL_URL = "" + exports.APP_URI + exports.graphQLPath;
exports.GRAPHIQL_URL = "" + exports.APP_URI + exports.graphiQLPath;
exports.passwordIterations = 10000;
//# sourceMappingURL=config.js.map