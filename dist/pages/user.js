"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var link_1 = require("next/link");
var react_apollo_1 = require("react-apollo");
var graphql_tag_1 = require("graphql-tag");
var react_render_html_1 = require("react-render-html");
var MainLayout_1 = require("../layouts/MainLayout");
var Blank_1 = require("../layouts/Blank");
var withData_1 = require("../helpers/withData");
var convertNumberToTimeAgo_1 = require("../helpers/convertNumberToTimeAgo");
var Page = function (_a) {
    var loading = _a.loading, error = _a.error, user = _a.user, me = _a.me, currentURL = _a.options.currentURL;
    if (error)
        return React.createElement(Blank_1.Blank, null, "Error loading news items.");
    if (!user)
        return React.createElement(Blank_1.Blank, null, "No such user.");
    var about = user.about || '';
    var email = user.email || '';
    var onAboutChange = function (e) {
        about = e.target.value;
    };
    var onEmailChange = function (e) {
        email = e.target.value;
    };
    if (me && user.id === me.id)
        return (React.createElement(MainLayout_1.MainLayout, { currentURL: currentURL, isFooterVisible: false },
            React.createElement("tr", null,
                React.createElement("td", null,
                    React.createElement("form", { className: "profileform", method: "post", action: "/xuser" },
                        React.createElement("input", { type: "hidden", name: "id", value: "clintonwoo" }),
                        React.createElement("input", { type: "hidden", name: "hmac", value: "71104445c3c41b4167c38db67a656e610d5fbad9" }),
                        React.createElement("table", { style: { border: '0px' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { className: "athing" },
                                    React.createElement("td", { style: { verticalAlign: 'top' } }, "user:"),
                                    React.createElement("td", null,
                                        React.createElement(link_1.default, { prefetch: true, href: "/user?id=clintonwoo" },
                                            React.createElement("a", { className: "hnuser" },
                                                React.createElement("font", { color: "#3c963c" }, user.id))))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { verticalAlign: 'top' } }, "created:"),
                                    React.createElement("td", null, convertNumberToTimeAgo_1.convertNumberToTimeAgo(user.creationTime))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { verticalAlign: 'top' } }, "karma:"),
                                    React.createElement("td", null, user.karma)),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { verticalAlign: 'top' } }, "about:"),
                                    React.createElement("td", null,
                                        React.createElement("textarea", { defaultValue: react_render_html_1.default(about), onChange: onAboutChange, cols: "60", rows: "5", wrap: "virtual", name: "about" }),
                                        React.createElement("font", { size: "-2" },
                                            React.createElement(link_1.default, { prefetch: true, href: "/formatdoc" },
                                                React.createElement("a", { tabIndex: "-1" },
                                                    React.createElement("font", { color: "#afafaf" }, "help")))))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { verticalAlign: 'top' } }, "email:"),
                                    React.createElement("td", null,
                                        React.createElement("input", { type: "text", name: "uemail", defaultValue: email, onChange: onEmailChange, size: "60" }))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { verticalAlign: 'top' } }, "showdead:"),
                                    React.createElement("td", null,
                                        React.createElement("select", { defaultValue: "no", name: "showd" },
                                            React.createElement("option", { value: "yes" }, "yes"),
                                            React.createElement("option", { value: "no" }, "no")))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { verticalAlign: 'top' } }, "noprocrast:"),
                                    React.createElement("td", null,
                                        React.createElement("select", { defaultValue: "no", name: "nopro" },
                                            React.createElement("option", { value: "yes" }, "yes"),
                                            React.createElement("option", { value: "no" }, "no")))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { verticalAlign: 'top' } }, "maxvisit:"),
                                    React.createElement("td", null,
                                        React.createElement("input", { type: "text", name: "maxv", defaultValue: "20", size: "16" }))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { verticalAlign: 'top' } }, "minaway:"),
                                    React.createElement("td", null,
                                        React.createElement("input", { type: "text", name: "mina", defaultValue: "180", size: "16" }))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { verticalAlign: 'top' } }, "delay:"),
                                    React.createElement("td", null,
                                        React.createElement("input", { type: "text", name: "delay", defaultValue: "0", size: "16" }))),
                                React.createElement("tr", null,
                                    React.createElement("td", null),
                                    React.createElement("td", null,
                                        React.createElement(link_1.default, { prefetch: true, href: "/changepw" },
                                            React.createElement("a", null,
                                                React.createElement("u", null, "change password"))))),
                                React.createElement("tr", null,
                                    React.createElement("td", null),
                                    React.createElement("td", null,
                                        React.createElement(link_1.default, { prefetch: true, href: "/submitted?id=clintonwoo" },
                                            React.createElement("a", null,
                                                React.createElement("u", null, "submissions"))))),
                                React.createElement("tr", null,
                                    React.createElement("td", null),
                                    React.createElement("td", null,
                                        React.createElement(link_1.default, { prefetch: true, href: "/threads?id=clintonwoo" },
                                            React.createElement("a", null,
                                                React.createElement("u", null, "comments"))))),
                                React.createElement("tr", null,
                                    React.createElement("td", null),
                                    React.createElement("td", null,
                                        React.createElement(link_1.default, { prefetch: true, href: "/hidden" },
                                            React.createElement("a", null,
                                                React.createElement("u", null, "hidden"))))),
                                React.createElement("tr", null,
                                    React.createElement("td", null),
                                    React.createElement("td", null,
                                        React.createElement(link_1.default, { prefetch: true, href: "/upvoted?id=clintonwoo" },
                                            React.createElement("a", null,
                                                React.createElement("u", null, "upvoted submissions"))),
                                        ' / ',
                                        React.createElement(link_1.default, { prefetch: true, href: "/upvoted?id=clintonwoo&comments=t" },
                                            React.createElement("a", null,
                                                React.createElement("u", null, "comments"))),
                                        "\u00A0\u00A0",
                                        React.createElement("span", { style: { fontStyle: 'italic' } }, "(private)"))),
                                React.createElement("tr", null,
                                    React.createElement("td", null),
                                    React.createElement("td", null,
                                        React.createElement(link_1.default, { prefetch: true, href: "/favorites?id=clintonwoo" },
                                            React.createElement("a", null,
                                                React.createElement("u", null, "favorite submissions"))),
                                        ' / ',
                                        React.createElement(link_1.default, { prefetch: true, href: "/favorites?id=clintonwoo&comments=t" },
                                            React.createElement("a", null,
                                                React.createElement("u", null, "comments"))),
                                        "\u00A0\u00A0",
                                        React.createElement("span", { style: { fontStyle: 'italic' } }, "(shared)"))))),
                        React.createElement("br", null),
                        React.createElement("input", { type: "submit", value: "update" })),
                    React.createElement("br", null),
                    React.createElement("br", null)))));
    return (React.createElement(MainLayout_1.MainLayout, { currentURL: currentURL, isFooterVisible: false },
        React.createElement("tr", null,
            React.createElement("td", null,
                React.createElement("table", { style: { border: '0' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", { className: "athing" },
                            React.createElement("td", { style: { verticalAlign: 'top' } }, "user:"),
                            React.createElement("td", null,
                                React.createElement("a", { href: "user?id=" + user.id, className: "hnuser" }, user.id))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { verticalAlign: 'top' } }, "created:"),
                            React.createElement("td", null, convertNumberToTimeAgo_1.convertNumberToTimeAgo(user.creationTime))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { verticalAlign: 'top' } }, "karma:"),
                            React.createElement("td", null, user.karma)),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { verticalAlign: 'top' } }, "about:"),
                            React.createElement("td", null, user.about && react_render_html_1.default(user.about))),
                        React.createElement("tr", null,
                            React.createElement("td", null),
                            React.createElement("td", null,
                                React.createElement("a", { href: "submitted?id=" + user.id },
                                    React.createElement("u", null, "submissions")))),
                        React.createElement("tr", null,
                            React.createElement("td", null),
                            React.createElement("td", null,
                                React.createElement("a", { href: "threads?id=" + user.id },
                                    React.createElement("u", null, "comments")))),
                        React.createElement("tr", null,
                            React.createElement("td", null),
                            React.createElement("td", null,
                                React.createElement("a", { href: "favorites?id=" + user.id },
                                    React.createElement("u", null, "favorites")))))),
                React.createElement("br", null),
                React.createElement("br", null)))));
};
var query = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query User($id: String!) {\n    user(id: $id) {\n      id\n      about\n      creationTime\n      email\n      karma\n    }\n    me {\n      id\n    }\n  }\n"], ["\n  query User($id: String!) {\n    user(id: $id) {\n      id\n      about\n      creationTime\n      email\n      karma\n    }\n    me {\n      id\n    }\n  }\n"])));
var UserPageWithData = react_apollo_1.graphql(query, {
    options: function (_a) {
        var id = _a.options.id;
        return ({
            variables: {
                id: id,
            },
        });
    },
    props: function (_a) {
        var _b = _a.data, loading = _b.loading, error = _b.error, user = _b.user, me = _b.me;
        return ({
            loading: loading,
            error: error,
            user: user,
            me: me,
        });
    },
})(Page);
exports.default = withData_1.withData(function (props) {
    var userId = (props.url.query && props.url.query.id) || '';
    return (React.createElement(UserPageWithData, { options: {
            id: userId,
            currentURL: props.url.pathname,
        } }));
});
var templateObject_1;
//# sourceMappingURL=user.js.map