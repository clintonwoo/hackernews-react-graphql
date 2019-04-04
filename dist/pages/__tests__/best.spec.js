"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var best_1 = require("../best");
describe('Best Posts Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(best_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=best.spec.js.map