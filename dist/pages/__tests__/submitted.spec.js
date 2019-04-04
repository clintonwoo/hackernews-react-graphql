"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var submitted_1 = require("../submitted");
describe('Submitted Posts Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(submitted_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=submitted.spec.js.map