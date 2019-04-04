"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var changepw_1 = require("../changepw");
describe('Change Password Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(changepw_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=changepw.spec.js.map