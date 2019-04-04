"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var front_1 = require("../front");
describe('Front Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(front_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=front.spec.js.map