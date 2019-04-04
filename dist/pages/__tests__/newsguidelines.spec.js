"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var newsguidelines_1 = require("../newsguidelines");
describe('Guidelines Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(newsguidelines_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=newsguidelines.spec.js.map