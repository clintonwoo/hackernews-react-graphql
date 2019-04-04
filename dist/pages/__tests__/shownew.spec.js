"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var shownew_1 = require("../shownew");
describe('Show New Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(shownew_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=shownew.spec.js.map