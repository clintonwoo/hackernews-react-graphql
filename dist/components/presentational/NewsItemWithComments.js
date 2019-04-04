"use strict";
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
var NewsTitleWithData_1 = require("../container/NewsTitleWithData");
var NewsDetailWithData_1 = require("../container/NewsDetailWithData");
var CommentBox_1 = require("./CommentBox");
var Comments_1 = require("./Comments");
exports.NewsItemWithComments = function (_a) {
    var newsItem = _a.newsItem;
    return (React.createElement("tr", null,
        React.createElement("td", { style: { padding: '0px' } },
            React.createElement("table", { style: { border: '0px', padding: '0px', borderCollapse: 'collapse', borderSpacing: '0px' }, className: "itemlist" },
                React.createElement("tbody", null,
                    React.createElement(NewsTitleWithData_1.default, __assign({ isRankVisible: false }, newsItem)),
                    React.createElement(NewsDetailWithData_1.default, __assign({ isPostScrutinyVisible: true }, newsItem)),
                    React.createElement("tr", { key: "morespace", className: "morespace", style: { height: '10px' } }),
                    React.createElement(CommentBox_1.CommentBox, null))),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement(Comments_1.Comments, { newsItem: newsItem }),
            React.createElement("br", null),
            React.createElement("br", null))));
};
//# sourceMappingURL=NewsItemWithComments.js.map