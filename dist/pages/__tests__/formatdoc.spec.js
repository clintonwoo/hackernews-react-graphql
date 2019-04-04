"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var formatdoc_1 = require("../formatdoc");
describe('Format Doc Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(formatdoc_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=formatdoc.spec.js.map