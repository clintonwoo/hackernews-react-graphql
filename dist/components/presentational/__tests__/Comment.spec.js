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
var Comment_1 = require("../Comment");
var SampleData_1 = require("../../../data/SampleData");
var comment = SampleData_1.default.comments[0];
mockdate_1.default.set(1506022129802);
describe('Comment component', function () {
    it('shallow renders', function () {
        var wrapper = enzyme_1.shallow(React.createElement(Comment_1.default, __assign({}, comment, { indentationLevel: 0 })));
        expect(wrapper).toMatchSnapshot();
    });
    it('renders a comment passed in as props', function () {
        var wrapper = enzyme_1.shallow(React.createElement(Comment_1.default, __assign({}, comment, { indentationLevel: 0 })));
        expect(wrapper).toMatchSnapshot();
    });
    it('renders at different indentation levels', function () {
        var wrapper = enzyme_1.shallow(React.createElement(Comment_1.default, __assign({}, comment, { indentationLevel: 0 })));
        expect(wrapper).toMatchSnapshot();
    });
});
//# sourceMappingURL=Comment.spec.js.map