"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
var NewsFeed_1 = require("../../components/presentational/NewsFeed");
exports.submitNewsItem = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation SubmitNewsItem($title: String!, $url: String) {\n    submitNewsItem(title: $title, url: $url) {\n      id\n      ...NewsFeed\n    }\n  }\n  ", "\n"], ["\n  mutation SubmitNewsItem($title: String!, $url: String) {\n    submitNewsItem(title: $title, url: $url) {\n      id\n      ...NewsFeed\n    }\n  }\n  ", "\n"])), NewsFeed_1.NewsFeed.fragments.newsItem);
var templateObject_1;
//# sourceMappingURL=submitNewsItem.js.map