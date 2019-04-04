"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var ask_1 = require("../ask");
describe('Newest Posts Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(ask_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=ask.spec.js.map