"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var bodyParser = require("body-parser");
var express = require("express");
var Models_1 = require("./Models");
var Schema_1 = require("./Schema");
var config_1 = require("../config");
var logger = console;
var app = express();
app.use(config_1.graphQLPath, bodyParser.json(), apollo_server_express_1.graphqlExpress(function (request) { return ({
    schema: Schema_1.schema,
    rootValue: { request: request },
    context: {
        Comment: Models_1.Comment,
        Feed: Models_1.FeedSingleton,
        NewsItem: Models_1.NewsItem,
        User: Models_1.User,
    },
    debug: true,
}); }));
app.use(config_1.graphiQLPath, apollo_server_express_1.graphiqlExpress({
    endpointURL: config_1.graphQLPath,
}));
app.listen(config_1.APP_PORT, function () {
    logger.info("==> \uD83D\uDCC8 GraphQL Server on " + config_1.GRAPHQL_URL);
    logger.info("==> \uD83C\uDF0E  Go to " + config_1.GRAPHIQL_URL);
});
//# sourceMappingURL=graphiql.js.map