"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var hidden_1 = require("../hidden");
describe('Hidden Posts Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(hidden_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=hidden.spec.js.map