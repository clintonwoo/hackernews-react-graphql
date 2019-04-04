"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_apollo_1 = require("react-apollo");
var graphql_tag_1 = require("graphql-tag");
var MainLayout_1 = require("../layouts/MainLayout");
var Comment_1 = require("../components/presentational/Comment");
var withData_1 = require("../helpers/withData");
var query = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query Comment($id: Int!) {\n    comment(id: $id) {\n      id\n      ...Comment\n    }\n  }\n  ", "\n"], ["\n  query Comment($id: Int!) {\n    comment(id: $id) {\n      id\n      ...Comment\n    }\n  }\n  ", "\n"])), Comment_1.default.fragments.comment);
var variables = {
    id: 100,
};
var page = function (_a) {
    var _b = _a.data, loading = _b.loading, error = _b.error, comment = _b.comment, data = _a.data, options = _a.options;
    var vote = function () {
        console.log('onclick');
    };
    var toggle = function () {
        console.log('toggle');
    };
    return (React.createElement("tr", null,
        React.createElement("td", null,
            React.createElement("table", { className: "fatitem", style: { border: '0' } },
                React.createElement("tbody", null,
                    React.createElement("tr", { className: "athing", id: "15260438" },
                        React.createElement("td", { className: "ind" }),
                        React.createElement("td", { style: { verticalAlign: 'top' }, className: "votelinks" },
                            React.createElement("center", null,
                                React.createElement("a", { id: "up_15260438", onClick: vote, href: "vote?id=15260438&how=up&auth=82a0b28fffc36f0d2f3e733c3a339bb29315dd10&goto=reply%3Fgoto%3Ditem%3Fid%3D15260384%2315260438%26id%3D15260438#15260438" },
                                    React.createElement("div", { className: "votearrow", title: "upvote" })))),
                        React.createElement("td", { className: "default" },
                            React.createElement("div", { style: { marginTop: '2px', marginBottom: '-10px' } },
                                React.createElement("span", { className: "comhead" },
                                    React.createElement("a", { href: "user?id=philipkglass", className: "hnuser" }, "philipkglass"),
                                    React.createElement("span", { className: "age" },
                                        React.createElement("a", { href: "item?id=15260438" }, "2 hours ago")),
                                    React.createElement("span", { id: "unv_15260438" }),
                                    React.createElement("span", { className: "par" },
                                        " | ",
                                        React.createElement("a", { href: "item?id=15260384" }, "parent")),
                                    React.createElement("a", { className: "togg", href: "javascript:void(0)", onClick: toggle }),
                                    React.createElement("span", { className: "storyon" },
                                        " | on: ",
                                        React.createElement("a", { href: "item?id=15260384" }, "Electric dump truck stores as much energy as 8 Mod...")))),
                            React.createElement("br", null),
                            React.createElement("div", { className: "comment" },
                                React.createElement("span", { className: "c00" },
                                    React.createElement("i", null, "Because the vehicle is electric, there is no need to \u201Cheat up\u201D the brakes when descending. This is because the enormous electric engine acts as a generator and recharges the battery pack. That same energy is then used to help the vehicle travel back up the hill. Phys reports, \u201CIf all goes as planned, the electric dumper truck will even harvest more electricity while traveling downhill than it needs for the ascent. Instead of consuming fossil fuels, it would then feed surplus electricity into the grid.\u201D"),
                                    React.createElement("p", null,
                                        "Clever. It can do this because it travels uphill empty and comes downhill full.",
                                        React.createElement("span", null)),
                                    React.createElement("div", { className: "reply" }))))),
                    React.createElement("tr", { style: { height: '10px' } }),
                    React.createElement("tr", null,
                        React.createElement("td", { colSpan: "2" }),
                        React.createElement("td", null,
                            React.createElement("form", { method: "post", action: "comment" },
                                React.createElement("input", { type: "hidden", name: "parent", value: "15260438" }),
                                React.createElement("input", { type: "hidden", name: "goto", value: "item?id=15260384#15260438" }),
                                React.createElement("input", { type: "hidden", name: "hmac", value: "d4cda96b7000a0e0cd578dde21feb6c9070cda8a" }),
                                React.createElement("textarea", { name: "text", rows: "6", cols: "60" }),
                                React.createElement("br", null),
                                React.createElement("br", null),
                                React.createElement("input", { type: "submit", value: "reply" })))))))));
};
var ReplyToComment = react_apollo_1.graphql(query, {
    options: {
        variables: variables,
    },
    props: function (_a) {
        var data = _a.data;
        return ({
            data: data,
        });
    },
})(page);
exports.default = withData_1.default(function (props) {
    variables.id = (props.url.query && +props.url.query.id) || 0;
    return (React.createElement(MainLayout_1.default, { title: "Add Comment", currentURL: props.url.pathname, isNavVisible: false },
        React.createElement(ReplyToComment, null)));
});
var templateObject_1;
//# sourceMappingURL=reply.js.map