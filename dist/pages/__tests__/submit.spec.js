"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var submit_1 = require("../submit");
describe('Submit Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(submit_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=submit.spec.js.map