"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
exports.hideNewsItem = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation HideNewsItem($id: Int!) {\n    hideNewsItem(id: $id) {\n      id\n      hidden\n    }\n  }\n"], ["\n  mutation HideNewsItem($id: Int!) {\n    hideNewsItem(id: $id) {\n      id\n      hidden\n    }\n  }\n"])));
var templateObject_1;
//# sourceMappingURL=hideNewsItem.js.map