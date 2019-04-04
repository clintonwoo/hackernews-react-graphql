"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var MainLayout_1 = require("../layouts/MainLayout");
var withData_1 = require("../helpers/withData");
exports.default = withData_1.default(function (props) { return (React.createElement(MainLayout_1.default, { isFooterVisible: false, isNavVisible: false, isUserVisible: false, title: "Formatting Options" },
    React.createElement("tr", null,
        React.createElement("td", null,
            React.createElement("span", { className: "admin" },
                React.createElement("center", null,
                    React.createElement("table", { width: "500" },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    "Blank lines separate paragraphs.",
                                    React.createElement("p", null, "Text after a blank line that is indented by two or more spaces is reproduced verbatim.  (This is intended for code.)"),
                                    React.createElement("p", null, "Text surrounded by asterisks is italicized, if the character after the first asterisk isn't whitespace."),
                                    React.createElement("p", null,
                                        "Urls become links, except in the text field of a submission.",
                                        React.createElement("br", null),
                                        React.createElement("br", null)))))))),
            React.createElement("br", null),
            React.createElement("br", null))))); });
//# sourceMappingURL=formatdoc.js.map