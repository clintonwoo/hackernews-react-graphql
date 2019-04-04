"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var lists_1 = require("../lists");
describe('Lists Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(lists_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=lists.spec.js.map