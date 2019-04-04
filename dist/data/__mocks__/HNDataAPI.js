"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SampleData_1 = require("../SampleData");
function fetchNewsItem(id) {
    return SampleData_1.sampleData.topStoriesCache.find(function (item) { return item.id === id; });
}
exports.fetchNewsItem = fetchNewsItem;
function fetchComment(id) {
    return SampleData_1.sampleData.topStoriesCache[0].find(function (item) { return item.id === id; });
}
exports.fetchComment = fetchComment;
//# sourceMappingURL=HNDataAPI.js.map