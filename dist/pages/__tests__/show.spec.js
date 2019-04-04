"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var show_1 = require("../show");
describe('Show Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(show_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=show.spec.js.map