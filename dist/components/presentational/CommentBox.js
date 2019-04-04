"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
exports.CommentBox = function (props) { return (React.createElement("tr", null,
    React.createElement("td", { colSpan: 2 }),
    React.createElement("td", null,
        React.createElement("form", { method: "post", action: "comment" },
            React.createElement("input", { type: "hidden", name: "parent", value: "15237896" }),
            React.createElement("input", { type: "hidden", name: "goto", value: "item?id=15237896" }),
            React.createElement("input", { type: "hidden", name: "hmac", value: "02641d0660c89c1a83ccf0d171e42497d10d2135" }),
            React.createElement("textarea", { name: "text", rows: 6, cols: 60 }),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("input", { type: "submit", value: "add comment" }))))); };
//# sourceMappingURL=CommentBox.js.map