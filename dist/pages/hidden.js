"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var MainLayout_1 = require("../layouts/MainLayout");
var NewsFeed_1 = require("../components/presentational/NewsFeed");
var withData_1 = require("../helpers/withData");
var SampleData_1 = require("../data/SampleData");
exports.default = withData_1.default(function (props) { return (React.createElement(MainLayout_1.default, { currentURL: props.url.pathname },
    React.createElement(NewsFeed_1.default, { newsItems: SampleData_1.default.newsItems }))); });
//# sourceMappingURL=hidden.js.map