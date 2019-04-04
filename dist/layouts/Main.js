"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var prop_types_1 = require("prop-types");
var head_1 = require("next/head");
var react_apollo_1 = require("react-apollo");
var Header_1 = require("../components/presentational/Header");
var Footer_1 = require("../components/presentational/Footer");
var meQuery_1 = require("../data/queries/meQuery");
var Main = function (props) { return (React.createElement("center", null,
    React.createElement(head_1.default, null,
        React.createElement("title", null, "Hacker News Clone"),
        React.createElement("meta", { name: "referrer", content: "origin" }),
        React.createElement("meta", { name: "viewport", content: "initial-scale=1.0, width=device-width" }),
        React.createElement("link", { rel: "stylesheet", type: "text/css", href: "/static/news.css" }),
        React.createElement("link", { rel: "shortcut icon", href: "/static/favicon.ico" })),
    React.createElement("table", { id: "hnmain", style: { border: '0px', padding: '0px', borderSpacing: '0px', borderCollapse: 'collapse', width: '85%', backgroundColor: '#f6f6ef' } },
        React.createElement("tbody", null,
            React.createElement(Header_1.default, { title: props.title, isNavVisible: props.isNavVisible, isUserVisible: props.isUserVisible, me: props.me, currentURL: props.currentURL }),
            React.createElement("tr", { style: { height: '10px' } }),
            props.children,
            props.isFooterVisible && React.createElement(Footer_1.default, null))))); };
Main.defaultProps = {
    isFooterVisible: true,
    isNavVisible: true,
    isUserVisible: true,
    title: 'Hacker News',
    me: null,
};
Main.propTypes = {
    children: prop_types_1.default.node.isRequired,
    isNavVisible: prop_types_1.default.bool,
    isUserVisible: prop_types_1.default.bool,
    isFooterVisible: prop_types_1.default.bool,
    title: prop_types_1.default.string,
    me: prop_types_1.default.shape({
        id: prop_types_1.default.string,
        karma: prop_types_1.default.number,
    }),
    currentURL: prop_types_1.default.string.isRequired,
};
exports.default = react_apollo_1.graphql(meQuery_1.default, {
    options: {},
    props: function (_a) {
        var me = _a.data.me;
        return ({
            me: me,
        });
    },
})(Main);
//# sourceMappingURL=Main.js.map