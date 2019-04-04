"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var MainLayout_1 = require("../layouts/MainLayout");
var withData_1 = require("../helpers/withData");
exports.default = withData_1.default(function (props) { return (React.createElement(MainLayout_1.default, { currentURL: props.url.pathname },
    React.createElement("h1", null, "Change PW"))); });
//# sourceMappingURL=changepw.js.map