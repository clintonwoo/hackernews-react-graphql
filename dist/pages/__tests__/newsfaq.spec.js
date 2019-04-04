"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var newsfaq_1 = require("../newsfaq");
describe('FAQ Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(newsfaq_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=newsfaq.spec.js.map