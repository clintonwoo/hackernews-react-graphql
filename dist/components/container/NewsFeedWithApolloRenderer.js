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
var NewsFeed_1 = require("../presentational/NewsFeed");
var LoadingSpinner_1 = require("../presentational/LoadingSpinner");
exports.default = (function (_a) {
    var _b = _a.data, loading = _b.loading, error = _b.error, feed = _b.feed, data = _a.data, options = _a.options;
    if (error)
        return React.createElement("tr", null,
            React.createElement("td", null, "Error loading news items."));
    if (feed && feed.length)
        return React.createElement(NewsFeed_1.default, __assign({ newsItems: feed }, options));
    return React.createElement(LoadingSpinner_1.default, null);
});
//# sourceMappingURL=NewsFeedWithApolloRenderer.js.map