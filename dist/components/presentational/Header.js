"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var link_1 = require("next/link");
var React = require("react");
var HeaderNav_1 = require("./HeaderNav");
exports.Header = function (props) { return (React.createElement("tr", null,
    React.createElement("td", { style: { backgroundColor: '#ff6600', padding: '0px' } },
        React.createElement("table", { style: { border: '0px', padding: '2px', borderSpacing: '0px', width: '100%' } },
            React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("td", { style: { width: '18px', padding: '0px', paddingRight: '4px' } },
                        React.createElement(link_1.default, { prefetch: true, href: "/" },
                            React.createElement("a", null,
                                React.createElement("img", { src: "/static/y18.gif", style: { width: '18px', height: '18px', border: '1px', borderColor: 'white', borderStyle: 'solid' } })))),
                    React.createElement("td", { style: { lineHeight: '12px', height: '10px', padding: '0px' } },
                        React.createElement(HeaderNav_1.HeaderNav, __assign({}, props))),
                    React.createElement("td", { style: { textAlign: 'right', padding: '0px', paddingRight: '4px' } }, props.me ? (React.createElement("span", { className: "pagetop" },
                        React.createElement(link_1.default, { prefetch: true, href: "/user?id=" + props.me.id },
                            React.createElement("a", null, props.me.id)), " (" + props.me.karma + ") | ",
                        React.createElement("a", { href: "/logout?auth=d78ccc2c6120ffe08f32451519c2ff46d34c51ab&amp;goto=" + props.currentURL }, "logout"))) : (React.createElement("span", { className: "pagetop" },
                        React.createElement(link_1.default, { prefetch: true, href: "/login?goto=" + props.currentURL },
                            React.createElement("a", null, "login"))))))))))); };
exports.Header.defaultProps = {
    me: null,
};
exports.Header.propTypes = {
    me: PropTypes.shape({
        id: PropTypes.string,
        karma: PropTypes.number,
    }),
    currentURL: PropTypes.string.isRequired,
    isNavVisible: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
};
//# sourceMappingURL=Header.js.map