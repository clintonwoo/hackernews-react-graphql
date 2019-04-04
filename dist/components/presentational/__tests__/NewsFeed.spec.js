"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var mockdate_1 = require("mockdate");
var enzyme_1 = require("enzyme");
var NewsFeed_1 = require("../NewsFeed");
var SampleData_1 = require("../../../data/SampleData");
mockdate_1.default.set(1506022129802);
describe('NewsFeed component', function () {
    it('renders news items passed in as props', function () {
        var wrapper = enzyme_1.shallow((React.createElement(NewsFeed_1.default, { newsItems: SampleData_1.default.newsItems, currentURL: "/", first: 30, skip: 0 })));
        expect(wrapper).toMatchSnapshot();
    });
});
//# sourceMappingURL=NewsFeed.spec.js.map