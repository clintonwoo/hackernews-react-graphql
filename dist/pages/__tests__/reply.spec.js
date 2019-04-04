"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var reply_1 = require("../reply");
describe('Reply Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(reply_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=reply.spec.js.map