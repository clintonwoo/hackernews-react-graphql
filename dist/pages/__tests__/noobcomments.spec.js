"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var noobcomments_1 = require("../noobcomments");
describe('Noob Comments Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(noobcomments_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=noobcomments.spec.js.map