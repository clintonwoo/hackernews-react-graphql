"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
var React = require("react");
var url_1 = require("url");
var NewsTitle = (function (_super) {
    __extends(NewsTitle, _super);
    function NewsTitle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewsTitle.prototype.render = function () {
        var _this = this;
        return (React.createElement("tr", { className: "athing", id: this.props.id },
            React.createElement("td", { style: { textAlign: 'right', verticalAlign: 'top' }, className: "title" },
                React.createElement("span", { className: "rank" }, this.props.isRankVisible && this.props.rank + ".")),
            React.createElement("td", { style: { verticalAlign: 'top' }, className: "votelinks" },
                React.createElement("center", null, this.props.isUpvoteVisible && (React.createElement("a", { className: this.props.upvoted ? 'nosee' : ' ', onClick: function () { return _this.props.upvoteNewsItem(_this.props.id); }, href: "javascript:void(0)" },
                    React.createElement("div", { className: "votearrow", title: "upvote" }))))),
            React.createElement("td", { className: "title" },
                React.createElement("a", { className: "storylink", href: this.props.url ? this.props.url : "item?id=" + this.props.id }, this.props.title),
                this.props.url && (React.createElement("span", { className: "sitebit comhead" },
                    ' ',
                    "(",
                    React.createElement("a", { href: "from?site=" + url_1.parse(this.props.url).hostname },
                        React.createElement("span", { className: "sitestr" }, url_1.parse(this.props.url).hostname)),
                    ")")))));
    };
    NewsTitle.propTypes = {
        id: PropTypes.number.isRequired,
        isRankVisible: PropTypes.bool,
        isUpvoteVisible: PropTypes.bool,
        rank: PropTypes.number,
        title: PropTypes.string.isRequired,
        url: PropTypes.string,
        upvoted: PropTypes.bool.isRequired,
        upvoteNewsItem: PropTypes.func.isRequired,
    };
    NewsTitle.defaultProps = {
        isRankVisible: true,
        isUpvoteVisible: true,
        rank: undefined,
        url: undefined,
    };
    NewsTitle.fragments = {
        newsItem: graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      fragment NewsTitle on NewsItem {\n        id\n        title\n        url\n        upvoted\n      }\n    "], ["\n      fragment NewsTitle on NewsItem {\n        id\n        title\n        url\n        upvoted\n      }\n    "]))),
    };
    return NewsTitle;
}(React.Component));
exports.NewsTitle = NewsTitle;
var templateObject_1;
//# sourceMappingURL=NewsTitle.js.map