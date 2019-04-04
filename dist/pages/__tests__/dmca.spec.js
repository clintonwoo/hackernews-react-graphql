"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var dmca_1 = require("../dmca");
describe('DMCA Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(dmca_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=dmca.spec.js.map