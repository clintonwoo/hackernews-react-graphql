"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enzyme_1 = require("enzyme");
var React = require("react");
var index_1 = require("../index");
describe('Home Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(index_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=index.spec.js.map