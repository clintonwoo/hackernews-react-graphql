"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var newswelcome_1 = require("../newswelcome");
describe('Welcome Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(newswelcome_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=newswelcome.spec.js.map