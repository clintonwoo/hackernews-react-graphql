"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var security_1 = require("../security");
describe('Security Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(security_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=security.spec.js.map