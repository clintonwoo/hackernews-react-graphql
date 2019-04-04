"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var login_1 = require("../login");
describe('Login Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(login_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=login.spec.js.map