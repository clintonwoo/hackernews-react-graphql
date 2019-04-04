"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var newcomments_1 = require("../newcomments");
describe('New Comments Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(newcomments_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=newcomments.spec.js.map