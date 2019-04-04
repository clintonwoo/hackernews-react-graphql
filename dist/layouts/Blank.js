"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var head_1 = require("next/head");
exports.Blank = function (props) { return (React.createElement("div", { className: "WordSection1" },
    React.createElement(head_1.default, null,
        React.createElement("title", null, "Hacker News Clone"),
        React.createElement("meta", { name: "referrer", content: "origin" }),
        React.createElement("meta", { name: "viewport", content: "initial-scale=1.0, width=device-width" }),
        React.createElement("link", { rel: "shortcut icon", href: "/static/favicon.ico" })),
    props.children)); };
//# sourceMappingURL=Blank.js.map