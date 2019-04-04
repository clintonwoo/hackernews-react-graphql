"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var showhn_1 = require("../showhn");
describe('Show HN Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(showhn_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=showhn.spec.js.map