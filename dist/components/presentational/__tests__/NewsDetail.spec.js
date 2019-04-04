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
var mockdate_1 = require("mockdate");
var enzyme_1 = require("enzyme");
var NewsDetail_1 = require("../NewsDetail");
var SampleData_1 = require("../../../data/SampleData");
var newsItem = SampleData_1.default.newsItems[0];
mockdate_1.default.set(1506022129802);
describe('NewsFeed component', function () {
    it('renders news items passed in as props', function () {
        var hideNewsItem = function () { return console.log('1'); };
        var wrapper = enzyme_1.shallow(React.createElement(NewsDetail_1.default, __assign({}, newsItem, { hideNewsItem: hideNewsItem, isFavoriteVisible: false })));
        expect(wrapper).toMatchSnapshot();
    });
});
//# sourceMappingURL=NewsDetail.spec.js.map