"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var graphql_tag_1 = require("graphql-tag");
var NewsTitleWithData_1 = require("../container/NewsTitleWithData");
var NewsDetailWithData_1 = require("../container/NewsDetailWithData");
exports.NewsFeed = function (props) {
    var nextPage = Math.ceil((props.skip || 1) / props.first) + 1;
    var rows = [];
    if (props.notice)
        rows.push.apply(rows, props.notice);
    props.newsItems.forEach(function (newsItem, index) {
        if (!newsItem.hidden) {
            rows.push(React.createElement(NewsTitleWithData_1.default, __assign({ key: newsItem.id.toString() + "title", isRankVisible: props.isRankVisible, isUpvoteVisible: props.isUpvoteVisible, rank: props.skip + index + 1 }, newsItem)));
            rows.push(React.createElement(NewsDetailWithData_1.default, __assign({ key: newsItem.id.toString() + "detail", isFavoriteVisible: false, isPostScrutinyVisible: props.isPostScrutinyVisible, isJobListing: props.isJobListing }, newsItem)));
            rows.push(React.createElement("tr", { className: "spacer", key: newsItem.id.toString() + "spacer", style: { height: 5 } }));
        }
    });
    rows.push(React.createElement("tr", { key: "morespace", className: "morespace", style: { height: '10px' } }));
    rows.push(React.createElement("tr", { key: "morelinktr" },
        React.createElement("td", { key: "morelinkcolspan", colSpan: "2" }),
        React.createElement("td", { key: "morelinktd", className: "title" },
            React.createElement("a", { key: "morelink", href: props.currentURL + "?p=" + nextPage, className: "morelink", rel: "nofollow" }, "More"))));
    return (React.createElement("tr", null,
        React.createElement("td", { style: { padding: '0px' } },
            React.createElement("table", { style: { border: '0px', padding: '0px', borderCollapse: 'collapse', borderSpacing: '0px' }, className: "itemlist" },
                React.createElement("tbody", null, rows)))));
};
exports.NewsFeed.defaultProps = {
    isPostScrutinyVisible: false,
    isJobListing: false,
    isRankVisible: true,
    isUpvoteVisible: true,
    notice: null,
};
exports.NewsFeed.propTypes = {
    isPostScrutinyVisible: PropTypes.bool,
    first: PropTypes.number.isRequired,
    newsItems: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        commentCount: PropTypes.number.isRequired,
        creationTime: PropTypes.number.isRequired,
        hidden: PropTypes.bool.isRequired,
        submitterId: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string,
        url: PropTypes.string,
        upvoteCount: PropTypes.number.isRequired,
    })).isRequired,
    notice: PropTypes.arrayOf(PropTypes.element),
    skip: PropTypes.number.isRequired,
    isJobListing: PropTypes.bool,
    isRankVisible: PropTypes.bool,
    isUpvoteVisible: PropTypes.bool,
    currentURL: PropTypes.string.isRequired,
};
exports.NewsFeed.fragments = {
    newsItem: graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    fragment NewsFeed on NewsItem {\n      id\n      hidden\n      ...NewsTitle\n      ...NewsDetail\n    }\n    ", "\n    ", "\n  "], ["\n    fragment NewsFeed on NewsItem {\n      id\n      hidden\n      ...NewsTitle\n      ...NewsDetail\n    }\n    ", "\n    ", "\n  "])), NewsTitleWithData_1.default.fragments.newsItem, NewsDetailWithData_1.default.fragments.newsItem),
};
var templateObject_1;
//# sourceMappingURL=NewsFeed.js.map