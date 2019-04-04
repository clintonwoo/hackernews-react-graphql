"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var jobs_1 = require("../jobs");
describe('Jobs Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(jobs_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=jobs.spec.js.map