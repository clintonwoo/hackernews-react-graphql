"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var threads_1 = require("../threads");
describe('Threads Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(threads_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=threads.spec.js.map