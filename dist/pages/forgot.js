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
var prop_types_1 = require("prop-types");
var Blank_1 = require("../layouts/Blank");
var withData_1 = require("../helpers/withData");
var Page = function (_a) {
    var registerUser = _a.registerUser, url = _a.url;
    var message;
    switch (url && url.query.how) {
        case 'up':
            message = 'You have to be logged in to vote.';
            break;
        default:
            message = undefined;
    }
    var user = '';
    var pass = '';
    var onUserChange = function (e) { user = e.target.value; };
    var onPasswordChange = function (e) { pass = e.target.value; };
    return (React.createElement(Blank_1.default, null,
        message && React.createElement("div", null, message),
        React.createElement("b", null, "Login"),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement("form", { method: "post", action: "/login", style: { marginBottom: '1em' } },
            React.createElement("input", { type: "hidden", name: "goto", value: "news" }),
            React.createElement("table", { style: { border: '0px' } },
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", null, "username:"),
                        React.createElement("td", null,
                            React.createElement("input", { type: "text", name: "username", size: "20", autoCorrect: "off", spellCheck: "false", autoCapitalize: "off", autoFocus: "true" }))),
                    React.createElement("tr", null,
                        React.createElement("td", null, "password:"),
                        React.createElement("td", null,
                            React.createElement("input", { type: "password", name: "password", size: "20" }))))),
            React.createElement("br", null),
            React.createElement("input", { type: "submit", value: "login" })),
        React.createElement(link_1.default, { prefetch: true, href: "/forgot" },
            React.createElement("a", null, "Forgot your password?")),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement("b", null, "Create Account"),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement("form", { method: "post", action: "/login", style: { marginBottom: '1em' } },
            React.createElement("input", { type: "hidden", name: "goto", value: "user?id=" + user }),
            React.createElement("input", { type: "hidden", name: "creating", value: true }),
            React.createElement("table", { style: { border: '0px' } },
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", null, "username:"),
                        React.createElement("td", null,
                            React.createElement("input", { type: "text", name: "username", onChange: onUserChange, size: "20", autoCorrect: "off", spellCheck: "false", autoCapitalize: "off" }))),
                    React.createElement("tr", null,
                        React.createElement("td", null, "password:"),
                        React.createElement("td", null,
                            React.createElement("input", { type: "password", name: "password", onChange: onPasswordChange, size: "20" }))))),
            React.createElement("br", null),
            React.createElement("input", { type: "submit", value: "create account", onClick: function () { return registerUser(user, pass); } }))));
};
Page.propTypes = {
    registerUser: prop_types_1.default.func.isRequired,
};
var registerUser = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation RegisterUser($id: String!, $password: String!) {\n    registerUser(id: $id, password: $password) {\n      id\n      karma\n    }\n  }\n"], ["\n  mutation RegisterUser($id: String!, $password: String!) {\n    registerUser(id: $id, password: $password) {\n      id\n      karma\n    }\n  }\n"])));
var PageWithData = react_apollo_1.graphql(registerUser, {
    props: function (_a) {
        var ownProps = _a.ownProps, mutate = _a.mutate, url = _a.url;
        return ({
            url: url,
            registerUser: function (id, password) {
                return mutate({
                    variables: { id: id, password: password },
                })
                    .catch(function (reason) { return console.error(reason); });
            },
        });
    },
})(Page);
exports.default = withData_1.default(function (props) { return (React.createElement(PageWithData, { url: props.url })); });
var templateObject_1;
//# sourceMappingURL=forgot.js.map