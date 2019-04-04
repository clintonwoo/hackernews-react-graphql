"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var newest_1 = require("../newest");
describe('Newest Posts Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(newest_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=newest.spec.js.map