"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var head_1 = require("next/head");
exports.Notice = function (props) { return (React.createElement("center", null,
    React.createElement(head_1.default, null,
        React.createElement("title", null, "Hacker News Clone"),
        React.createElement("meta", { name: "referrer", content: "origin" }),
        React.createElement("meta", { name: "viewport", content: "initial-scale=1.0, width=device-width" }),
        React.createElement("link", { rel: "stylesheet", type: "text/css", href: "/static/yc.css" }),
        React.createElement("link", { rel: "shortcut icon", href: "/static/favicon.ico" })),
    React.createElement("br", null),
    React.createElement("br", null),
    React.createElement("table", { width: "500", style: { padding: '0px' } },
        React.createElement("tbody", null,
            React.createElement("tr", null,
                React.createElement("td", { style: { backgroundColor: '#fafaf0' } },
                    React.createElement("a", { href: "http://www.ycombinator.com" },
                        React.createElement("img", { alt: "", src: "/static/yc500.gif", style: { border: '0px' }, width: "500" })),
                    React.createElement("br", null),
                    React.createElement("br", null),
                    props.children)))))); };
//# sourceMappingURL=Notice.js.map