"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var newpoll_1 = require("../newpoll");
describe('New Poll Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(newpoll_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=newpoll.spec.js.map