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
var NewsTitle_1 = require("../NewsTitle");
var SampleData_1 = require("../../../data/SampleData");
mockdate_1.default.set(1506022129802);
describe('NewsTitle component', function () {
    it('renders news item properties passed in as props', function () {
        var upvoteNewsItem = function () { return console.log('upvoteNewsItem'); };
        var wrapper = enzyme_1.shallow((React.createElement(NewsTitle_1.default, __assign({}, SampleData_1.default.newsItems[0], { upvoteNewsItem: upvoteNewsItem, isRankVisible: true, rank: 1 }))));
        expect(wrapper).toMatchSnapshot();
    });
});
//# sourceMappingURL=NewsTitle.spec.js.map