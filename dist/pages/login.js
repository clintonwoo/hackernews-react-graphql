"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var link_1 = require("next/link");
var router_1 = require("next/router");
var react_apollo_1 = require("react-apollo");
var prop_types_1 = require("prop-types");
var Blank_1 = require("../layouts/Blank");
var withData_1 = require("../helpers/withData");
var meQuery_1 = require("../data/queries/meQuery");
var User_1 = require("../data/validation/User");
var UserLoginErrorCode_1 = require("../data/enums/UserLoginErrorCode");
var Page = (function (_super) {
    __extends(Page, _super);
    function Page(props) {
        var _this = _super.call(this, props) || this;
        _this.onLoginIDChange = function (e) {
            _this.setState({
                login: {
                    id: e.target.value,
                    password: _this.state.login.password,
                },
            });
        };
        _this.onLoginPasswordChange = function (e) {
            _this.setState({
                login: {
                    id: _this.state.login.id,
                    password: e.target.value,
                },
            });
        };
        _this.onRegisterIDChange = function (e) {
            _this.setState({
                register: {
                    id: e.target.value,
                    password: _this.state.register.password,
                },
            });
        };
        _this.onRegisterPasswordChange = function (e) {
            _this.setState({
                register: {
                    id: _this.state.register.id,
                    password: e.target.value,
                },
            });
        };
        _this.validateLogin = function (e) {
            if (_this.props.me) {
                e.preventDefault();
                router_1.default.push('/login?how=loggedin');
            }
            else {
                try {
                    User_1.isValidNewUser(_this.state.login);
                }
                catch (err) {
                    e.preventDefault();
                    _this.setState({ validationMessage: err.message });
                }
            }
        };
        _this.validateRegister = function (e) {
            if (_this.props.me) {
                e.preventDefault();
                router_1.default.push('/login?how=loggedin');
            }
            else {
                try {
                    User_1.isValidNewUser(_this.state.register);
                }
                catch (err) {
                    e.preventDefault();
                    _this.setState({ validationMessage: err.message });
                }
            }
        };
        _this.state = {
            login: {
                id: '',
                password: '',
            },
            register: {
                id: '',
                password: '',
            },
            validationMessage: '',
        };
        return _this;
    }
    Page.prototype.render = function () {
        var _this = this;
        var message = '';
        if (this.props.url && this.props.url.query.how)
            message = UserLoginErrorCode_1.default.messages[this.props.url.query.how];
        return (React.createElement(Blank_1.default, null,
            message && React.createElement("p", null, message),
            this.state.validationMessage && React.createElement("p", null, this.state.validationMessage),
            React.createElement("b", null, "Login"),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("form", { method: "post", action: "/login", onSubmit: function (e) { return _this.validateLogin(e); }, style: { marginBottom: '1em' } },
                React.createElement("input", { type: "hidden", name: "goto", value: (this.props.url && this.props.url.query.goto) || 'news' }),
                React.createElement("table", { style: { border: '0px' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null, "username:"),
                            React.createElement("td", null,
                                React.createElement("input", { type: "text", name: "id", onChange: this.onLoginIDChange, size: "20", autoCorrect: "off", spellCheck: "false", autoCapitalize: "off", autoFocus: "true" }))),
                        React.createElement("tr", null,
                            React.createElement("td", null, "password:"),
                            React.createElement("td", null,
                                React.createElement("input", { type: "password", name: "password", onChange: this.onLoginPasswordChange, size: "20" }))))),
                React.createElement("br", null),
                React.createElement("input", { type: "submit", value: "login" })),
            React.createElement(link_1.default, { prefetch: true, href: "/forgot" },
                React.createElement("a", null, "Forgot your password?")),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("b", null, "Create Account"),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("form", { method: "post", action: "/register", onSubmit: function (e) { return _this.validateRegister(e); }, style: { marginBottom: '1em' } },
                React.createElement("table", { style: { border: '0px' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null, "username:"),
                            React.createElement("td", null,
                                React.createElement("input", { type: "text", name: "id", onChange: this.onRegisterIDChange, size: "20", autoCorrect: "off", spellCheck: "false", autoCapitalize: "off" }))),
                        React.createElement("tr", null,
                            React.createElement("td", null, "password:"),
                            React.createElement("td", null,
                                React.createElement("input", { type: "password", name: "password", onChange: this.onRegisterPasswordChange, size: "20" }))))),
                React.createElement("br", null),
                React.createElement("input", { type: "submit", value: "create account" }))));
    };
    Page.propTypes = {
        url: prop_types_1.default.shape({
            query: prop_types_1.default.shape(),
        }).isRequired,
        me: prop_types_1.default.shape({
            id: prop_types_1.default.string,
        }),
    };
    Page.defaultProps = {
        me: null,
    };
    return Page;
}(React.Component));
var LoginPage = react_apollo_1.graphql(meQuery_1.default, {
    options: {},
    props: function (_a) {
        var me = _a.data.me;
        return ({
            me: me,
        });
    },
})(Page);
exports.default = withData_1.default(function (props) { return (React.createElement(LoginPage, { url: props.url })); });
//# sourceMappingURL=login.js.map