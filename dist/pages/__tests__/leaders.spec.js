"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var leaders_1 = require("../leaders");
describe('Leaders Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(leaders_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=leaders.spec.js.map