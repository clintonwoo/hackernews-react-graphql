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
var React = require("react");
var graphql_tag_1 = require("graphql-tag");
var link_1 = require("next/link");
var convertNumberToTimeAgo_1 = require("../../helpers/convertNumberToTimeAgo");
var NewsDetail = (function (_super) {
    __extends(NewsDetail, _super);
    function NewsDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewsDetail.prototype.render = function () {
        var _this = this;
        return this.props.isJobListing ? (React.createElement("tr", null,
            React.createElement("td", { colSpan: "2" }),
            React.createElement("td", { className: "subtext" },
                React.createElement("span", { className: "age" },
                    React.createElement(link_1.default, { prefetch: true, href: "/item?id=" + this.props.id },
                        React.createElement("a", null, convertNumberToTimeAgo_1.convertNumberToTimeAgo(this.props.creationTime))))))) : (React.createElement("tr", null,
            React.createElement("td", { colSpan: "2" }),
            React.createElement("td", { className: "subtext" },
                React.createElement("span", { className: "score" },
                    this.props.upvoteCount,
                    " points"),
                ' by ',
                React.createElement(link_1.default, { prefetch: true, href: "/user?id=" + this.props.submitterId },
                    React.createElement("a", { className: "hnuser" }, this.props.submitterId)),
                ' ',
                React.createElement("span", { className: "age" },
                    React.createElement(link_1.default, { prefetch: true, href: "/item?id=" + this.props.id },
                        React.createElement("a", null, convertNumberToTimeAgo_1.convertNumberToTimeAgo(this.props.creationTime)))),
                ' | ',
                this.props.hidden ? (React.createElement("a", { href: "javascript:void(0)", onClick: function () { return _this.props.hideNewsItem(_this.props.id); } }, "hide")) : (React.createElement("a", { href: "javascript:void(0)", onClick: function () { return _this.props.unhideNewsItem(_this.props.id); } }, "hide")),
                this.props.isPostScrutinyVisible && (React.createElement("span", null,
                    ' | ',
                    React.createElement("a", { href: "https://hn.algolia.com/?query=Sublime%20Text%203.0&sort=byDate&dateRange=all&type=story&storyText=false&prefix&page=0" }, "past"),
                    ' | ',
                    React.createElement("a", { href: "https://www.google.com/search?q=Sublime%20Text%203.0" }, "web"))),
                ' | ',
                React.createElement(link_1.default, { prefetch: true, href: "/item?id=" + this.props.id },
                    React.createElement("a", null, (function () {
                        switch (_this.props.commentCount) {
                            case 0:
                                return 'discuss';
                            case 1:
                                return '1 comment';
                            default:
                                return _this.props.commentCount + " comments";
                        }
                    })())),
                this.props.isFavoriteVisible && ' | favorite')));
    };
    NewsDetail.propTypes = {
        id: PropTypes.number.isRequired,
        commentCount: PropTypes.number.isRequired,
        creationTime: PropTypes.number.isRequired,
        hidden: PropTypes.bool.isRequired,
        hideNewsItem: PropTypes.func.isRequired,
        isPostScrutinyVisible: PropTypes.bool,
        isFavoriteVisible: PropTypes.bool,
        isJobListing: PropTypes.bool,
        submitterId: PropTypes.string.isRequired,
        upvoteCount: PropTypes.number.isRequired,
    };
    NewsDetail.defaultProps = {
        isFavoriteVisible: true,
        isPostScrutinyVisible: false,
        isJobListing: false,
    };
    NewsDetail.fragments = {
        newsItem: graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      fragment NewsDetail on NewsItem {\n        id\n        commentCount\n        creationTime\n        hidden\n        submitterId\n        upvoteCount\n      }\n    "], ["\n      fragment NewsDetail on NewsItem {\n        id\n        commentCount\n        creationTime\n        hidden\n        submitterId\n        upvoteCount\n      }\n    "]))),
    };
    return NewsDetail;
}(React.Component));
exports.NewsDetail = NewsDetail;
var templateObject_1;
//# sourceMappingURL=NewsDetail.js.map