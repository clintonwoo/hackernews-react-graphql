"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var NewsFeed_1 = require("../components/presentational/NewsFeed");
var SampleData_1 = require("../data/SampleData");
var withData_1 = require("../helpers/withData");
var MainLayout_1 = require("../layouts/MainLayout");
exports.default = withData_1.withData(function (props) { return (React.createElement(MainLayout_1.Main, { currentURL: props.url.pathname },
    React.createElement(NewsFeed_1.NewsFeed, { newsItems: SampleData_1.sampleData.newsItems }))); });
//# sourceMappingURL=active.js.map