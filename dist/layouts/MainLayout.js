"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var head_1 = require("next/head");
var React = require("react");
var react_apollo_1 = require("react-apollo");
var Footer_1 = require("../components/presentational/Footer");
var Header_1 = require("../components/presentational/Header");
var meQuery_1 = require("../data/queries/meQuery");
var Main = function (props) { return (React.createElement("center", null,
    React.createElement(head_1.default, null,
        React.createElement("title", null, "Hacker News Clone"),
        React.createElement("meta", { name: "referrer", content: "origin" }),
        React.createElement("meta", { name: "viewport", content: "initial-scale=1.0, width=device-width" }),
        React.createElement("link", { rel: "stylesheet", type: "text/css", href: "/static/news.css" }),
        React.createElement("link", { rel: "shortcut icon", href: "/static/favicon.ico" })),
    React.createElement("table", { id: "hnmain", style: {
            border: '0px',
            padding: '0px',
            borderSpacing: '0px',
            borderCollapse: 'collapse',
            width: '85%',
            backgroundColor: '#f6f6ef',
        } },
        React.createElement("tbody", null,
            React.createElement(Header_1.Header, { title: props.title, isNavVisible: props.isNavVisible, isUserVisible: props.isUserVisible, me: props.me, currentURL: props.currentURL }),
            React.createElement("tr", { style: { height: '10px' } }),
            props.children,
            props.isFooterVisible && React.createElement(Footer_1.Footer, null))))); };
Main.defaultProps = {
    isFooterVisible: true,
    isNavVisible: true,
    isUserVisible: true,
    title: 'Hacker News',
    me: null,
};
Main.propTypes = {
    children: PropTypes.node.isRequired,
    isNavVisible: PropTypes.bool,
    isUserVisible: PropTypes.bool,
    isFooterVisible: PropTypes.bool,
    title: PropTypes.string,
    me: PropTypes.shape({
        id: PropTypes.string,
        karma: PropTypes.number,
    }),
    currentURL: PropTypes.string.isRequired,
};
exports.MainLayout = react_apollo_1.graphql(meQuery_1.meQuery, {
    options: {},
    props: function (_a) {
        var me = _a.data.me;
        return ({
            me: me,
        });
    },
})(Main);
//# sourceMappingURL=MainLayout.js.map