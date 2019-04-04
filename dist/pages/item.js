"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_apollo_1 = require("react-apollo");
var graphql_tag_1 = require("graphql-tag");
var MainLayout_1 = require("../layouts/MainLayout");
var NewsItemWithApolloRenderer_1 = require("../components/container/NewsItemWithApolloRenderer");
var NewsTitle_1 = require("../components/presentational/NewsTitle");
var NewsDetail_1 = require("../components/presentational/NewsDetail");
var Comments_1 = require("../components/presentational/Comments");
var withData_1 = require("../helpers/withData");
var query = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query NewsItemWithComments($id: Int!) {\n    newsItem(id: $id) {\n      id,\n      comments {\n        ...Comments\n      }\n      ...NewsTitle\n      ...NewsDetail\n    }\n  }\n  ", "\n  ", "\n  ", "\n"], ["\n  query NewsItemWithComments($id: Int!) {\n    newsItem(id: $id) {\n      id,\n      comments {\n        ...Comments\n      }\n      ...NewsTitle\n      ...NewsDetail\n    }\n  }\n  ", "\n  ", "\n  ", "\n"])), NewsTitle_1.default.fragments.newsItem, NewsDetail_1.default.fragments.newsItem, Comments_1.default.fragments.comment);
var NewsItemWithComments = react_apollo_1.graphql(query, {
    options: function (_a) {
        var id = _a.id;
        return ({
            variables: {
                id: id,
            },
        });
    },
    props: function (_a) {
        var data = _a.data;
        return ({
            data: data,
        });
    },
    loadMorePosts: function (data) { return data.fetchMore({
        variables: {
            skip: data.allNewsItems.length,
        },
        updateQuery: function (previousResult, _a) {
            var fetchMoreResult = _a.fetchMoreResult;
            if (!fetchMoreResult) {
                return previousResult;
            }
            return Object.assign({}, previousResult, {
                allNewsItems: previousResult.allNewsItems.concat(fetchMoreResult.allNewsItems),
            });
        },
    }); },
})(NewsItemWithApolloRenderer_1.default);
exports.default = withData_1.default(function (props) { return (React.createElement(MainLayout_1.default, { currentURL: props.url.pathname },
    React.createElement(NewsItemWithComments, { id: (props.url.query && +props.url.query.id) || 0 }))); });
var templateObject_1;
//# sourceMappingURL=item.js.map