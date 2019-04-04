"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var noobstories_1 = require("../noobstories");
describe('Noob Stories Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(noobstories_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=noobstories.spec.js.map