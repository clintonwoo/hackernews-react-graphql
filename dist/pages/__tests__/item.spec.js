"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var item_1 = require("../item");
describe('News Item Page', function () {
    it('is defined', function () {
        var app = enzyme_1.shallow(React.createElement(item_1.default, { serverState: {} }));
        expect(app).toBeDefined();
    });
});
//# sourceMappingURL=item.spec.js.map