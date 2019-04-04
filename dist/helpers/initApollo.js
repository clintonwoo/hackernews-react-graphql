"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
var apollo_client_1 = require("apollo-client");
var apollo_link_http_1 = require("apollo-link-http");
var debug_1 = require("debug");
var fetch = require("isomorphic-fetch");
var config_1 = require("../config");
var logger = debug_1.debug('app:initApollo');
logger.log = console.log.bind(console);
var apolloClient = null;
if (!process.browser) {
    global.fetch = fetch;
}
function create(initialState, _a) {
    var getToken = _a.getToken;
    return new apollo_client_1.ApolloClient({
        ssrMode: !process.browser,
        link: apollo_link_http_1.createHttpLink({
            uri: config_1.GRAPHQL_URL,
            credentials: 'same-origin',
            headers: {
                Cookie: "connect.sid=" + getToken()['connect.sid'],
            },
        }),
        cache: new apollo_cache_inmemory_1.InMemoryCache().restore(initialState || {}),
        connectToDevTools: process.browser,
    });
}
function initApollo(initialState, options) {
    if (!process.browser) {
        return create(initialState, options);
    }
    if (!apolloClient) {
        apolloClient = create(initialState, options);
    }
    return apolloClient;
}
exports.initApollo = initApollo;
//# sourceMappingURL=initApollo.js.map