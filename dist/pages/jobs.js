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
var NewsFeed_1 = require("../components/presentational/NewsFeed");
var NewsFeedWithApolloRenderer_1 = require("../components/container/NewsFeedWithApolloRenderer");
var withData_1 = require("../helpers/withData");
var POSTS_PER_PAGE = 30;
var query = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query topNewsItems($type: FeedType!, $first: Int!, $skip: Int!) {\n    feed(type: $type, first: $first, skip: $skip) {\n      ...NewsFeed\n    }\n  }\n  ", "\n"], ["\n  query topNewsItems($type: FeedType!, $first: Int!, $skip: Int!) {\n    feed(type: $type, first: $first, skip: $skip) {\n      ...NewsFeed\n    }\n  }\n  ", "\n"])), NewsFeed_1.default.fragments.newsItem);
var JobNewsFeed = react_apollo_1.graphql(query, {
    options: function (_a) {
        var _b = _a.options, first = _b.first, skip = _b.skip;
        return ({
            variables: {
                type: 'JOB',
                first: first,
                skip: skip,
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
})(NewsFeedWithApolloRenderer_1.default);
exports.default = withData_1.default(function (props) {
    var pageNumber = (props.url.query && +props.url.query.p) || 0;
    var notice = [
        React.createElement("tr", { key: "noticetopspacer", style: { height: '20px' } }),
        React.createElement("tr", { key: "notice" },
            React.createElement("td", null),
            React.createElement("td", null,
                React.createElement("img", { alt: "", src: "/static/s.gif", height: "1", width: "14" })),
            React.createElement("td", null,
                "These are jobs at startups that were funded by Y Combinator. You can also get a job at a YC startup through ",
                React.createElement("a", { href: "https://triplebyte.com/?ref=yc_jobs" },
                    React.createElement("u", null, "Triplebyte")),
                ".")),
        React.createElement("tr", { key: "noticebottomspacer", style: { height: '20px' } }),
    ];
    return (React.createElement(MainLayout_1.default, { currentURL: props.url.pathname },
        React.createElement(JobNewsFeed, { options: {
                currentURL: props.url.pathname,
                first: POSTS_PER_PAGE,
                isRankVisible: false,
                isUpvoteVisible: false,
                isJobListing: true,
                skip: POSTS_PER_PAGE * pageNumber,
                notice: notice,
            } })));
});
var templateObject_1;
//# sourceMappingURL=jobs.js.map