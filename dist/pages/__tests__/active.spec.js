"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var active_1 = require("../active");
describe('Active Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(active_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=active.spec.js.map