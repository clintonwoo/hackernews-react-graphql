"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var link_1 = require("next/link");
exports.HeaderNav = function (props) {
    return props.isNavVisible ? (React.createElement("span", { className: "pagetop" },
        React.createElement("b", { className: "hnname" },
            React.createElement(link_1.default, { prefetch: true, href: "/", as: "/news" },
                React.createElement("a", null, props.title))),
        "\u00A0",
        props.userId && (React.createElement(link_1.default, { prefetch: true, href: "/newswelcome" },
            React.createElement("a", null, "welcome"))),
        props.userId && ' | ',
        React.createElement(link_1.default, { prefetch: true, href: "/newest" },
            React.createElement("a", { className: props.currentURL === '/newest' ? 'topsel' : '' }, "new")),
        props.userId && ' | ',
        props.userId && (React.createElement(link_1.default, { prefetch: true, href: "/threads?id=" + props.userId },
            React.createElement("a", { className: props.currentURL === '/threads' ? 'topsel' : '' }, "threads"))),
        ' | ',
        React.createElement(link_1.default, { prefetch: true, href: "/newcomments" },
            React.createElement("a", { className: props.currentURL === '/newcomments' ? 'topsel' : '' }, "comments")),
        ' | ',
        React.createElement(link_1.default, { prefetch: true, href: "/show" },
            React.createElement("a", { className: props.currentURL === '/show' ? 'topsel' : '' }, "show")),
        ' | ',
        React.createElement(link_1.default, { prefetch: true, href: "/ask" },
            React.createElement("a", { className: props.currentURL === '/ask' ? 'topsel' : '' }, "ask")),
        ' | ',
        React.createElement(link_1.default, { prefetch: true, href: "/jobs" },
            React.createElement("a", { className: props.currentURL === '/jobs' ? 'topsel' : '' }, "jobs")),
        ' | ',
        React.createElement(link_1.default, { prefetch: true, href: "/submit" },
            React.createElement("a", { className: props.currentURL === '/submit' ? 'topsel' : '' }, "submit")),
        props.currentURL === '/best' && ' | ',
        props.currentURL === '/best' && (React.createElement(link_1.default, { prefetch: true, href: "/best" },
            React.createElement("a", { className: "topsel" }, "best"))))) : (React.createElement("span", { className: "pagetop" },
        React.createElement("b", null, props.title)));
};
exports.HeaderNav.defaultProps = {
    userId: null,
};
exports.HeaderNav.propTypes = {
    userId: PropTypes.string,
    currentURL: PropTypes.string.isRequired,
    isNavVisible: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
};
//# sourceMappingURL=HeaderNav.js.map