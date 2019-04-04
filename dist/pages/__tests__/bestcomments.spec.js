"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var bestcomments_1 = require("../bestcomments");
describe('Best Comments Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(bestcomments_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=bestcomments.spec.js.map