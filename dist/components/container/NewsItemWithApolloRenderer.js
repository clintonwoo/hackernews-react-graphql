"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var NewsItemWithComments_1 = require("../presentational/NewsItemWithComments");
var LoadingSpinner_1 = require("../presentational/LoadingSpinner");
exports.default = (function (_a) {
    var _b = _a.data, loading = _b.loading, error = _b.error, newsItem = _b.newsItem, data = _a.data;
    if (error)
        return React.createElement("tr", null,
            React.createElement("td", null, "Error loading news items."));
    if (newsItem && newsItem.comments)
        return React.createElement(NewsItemWithComments_1.default, { newsItem: newsItem });
    return React.createElement(LoadingSpinner_1.default, null);
});
//# sourceMappingURL=NewsItemWithApolloRenderer.js.map