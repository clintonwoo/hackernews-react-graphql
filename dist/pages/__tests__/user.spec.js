"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var user_1 = require("../user");
describe('User Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(user_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=user.spec.js.map