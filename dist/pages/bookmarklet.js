"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var link_1 = require("next/link");
var Notice_1 = require("../layouts/Notice");
exports.default = (function (props) { return (React.createElement(Notice_1.default, null,
    React.createElement("b", null, "Bookmarklet"),
    React.createElement("br", null),
    React.createElement("br", null),
    React.createElement("div", { id: "main" },
        React.createElement("p", { id: "first" },
            "Thanks to Phil Kast for writing this bookmarklet for submitting links to ",
            React.createElement(link_1.default, { prefetch: true, href: "/" },
                React.createElement("a", null, "Hacker News")),
            ". When you click on the bookmarklet, it will submit the page you're on. To install, drag this link to your browser toolbar:",
            React.createElement("br", null),
            React.createElement("br", null)),
        React.createElement("center", null,
            React.createElement("a", { style: { color: '#777', fontSize: '2em' }, href: "javascript:window.location=%22http://news.ycombinator.com/submitlink?u=%22+encodeURIComponent(document.location)+%22&t=%22+encodeURIComponent(document.title)" }, "post to HN")),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement("table", { width: "100%", style: { padding: '0px', backgroundColor: '#ff6600' } },
            React.createElement("tbody", null,
                React.createElement("tr", { style: { height: '0px' } },
                    React.createElement("td", { style: { padding: '0px' } })))),
        React.createElement("p", { style: { align: 'center' } },
            React.createElement("span", { className: "foot" },
                React.createElement("br", null),
                React.createElement("br", null)))))); });
//# sourceMappingURL=bookmarklet.js.map