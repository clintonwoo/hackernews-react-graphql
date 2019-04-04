"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_apollo_1 = require("react-apollo");
var link_1 = require("next/link");
var router_1 = require("next/router");
var prop_types_1 = require("prop-types");
var MainLayout_1 = require("../layouts/MainLayout");
var withData_1 = require("../helpers/withData");
var submitNewsItem_1 = require("../data/mutations/submitNewsItem");
var Page = function (_a) {
    var submitNewsItem = _a.submitNewsItem, currentURL = _a.currentURL;
    var title;
    var onTitleChange = function (e) { title = e.target.value; };
    var url;
    var onUrlChange = function (e) { url = e.target.value; };
    var text;
    var onTextChange = function (e) { text = e.target.value; };
    return (React.createElement(MainLayout_1.default, { currentURL: currentURL, title: 'Submit', isNavVisible: false, isFooterVisible: false },
        React.createElement("tr", null,
            React.createElement("td", null,
                React.createElement("form", { onSubmit: function (e) { return e.preventDefault(); } },
                    React.createElement("input", { type: "hidden", name: "fnid", value: "GvyHFpy11L26dCAIgGQ9rv" }),
                    React.createElement("input", { type: "hidden", name: "fnop", value: "submit-page" }),
                    React.createElement("script", { type: "text/javascript" }, "function tlen(el) { var n = el.value.length - 80; el.nextSibling.innerText = n > 0 ? n + ' too long' : ''; }"),
                    React.createElement("table", { style: { border: '0' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null, "title"),
                                React.createElement("td", null,
                                    React.createElement("input", { type: "text", name: "title", defaultValue: "", size: "50", onChange: onTitleChange }),
                                    React.createElement("span", { style: { marginLeft: '10px' } }))),
                            React.createElement("tr", null,
                                React.createElement("td", null, "url"),
                                React.createElement("td", null,
                                    React.createElement("input", { type: "text", name: "url", defaultValue: "", size: "50", onChange: onUrlChange }))),
                            React.createElement("tr", null,
                                React.createElement("td", null),
                                React.createElement("td", null,
                                    React.createElement("b", null, "or"))),
                            React.createElement("tr", null,
                                React.createElement("td", null, "text"),
                                React.createElement("td", null,
                                    React.createElement("textarea", { name: "text", rows: "4", cols: "49", onChange: onTextChange }))),
                            React.createElement("tr", null,
                                React.createElement("td", null),
                                React.createElement("td", null)),
                            React.createElement("tr", null,
                                React.createElement("td", null),
                                React.createElement("td", null,
                                    React.createElement("input", { type: "submit", value: "submit", onClick: function () { return submitNewsItem(title, url, text); } }))),
                            React.createElement("tr", { style: { height: '20px' } }),
                            React.createElement("tr", null,
                                React.createElement("td", null),
                                React.createElement("td", null,
                                    "Leave url blank to submit a question for discussion. If there is no url, the text (if any) will appear at the top of the thread.",
                                    React.createElement("br", null),
                                    React.createElement("br", null),
                                    "You can also submit via ",
                                    React.createElement(link_1.default, { prefetch: true, href: "/bookmarklet" },
                                        React.createElement("a", { rel: "nofollow" },
                                            React.createElement("u", null, "bookmarklet"))),
                                    ".")))))))));
};
Page.propTypes = {
    submitNewsItem: prop_types_1.default.func.isRequired,
    currentURL: prop_types_1.default.string.isRequired,
};
var PageWithData = react_apollo_1.graphql(submitNewsItem_1.default, {
    props: function (_a) {
        var ownProps = _a.ownProps, mutate = _a.mutate;
        return ({
            submitNewsItem: function (title, url, text) { return mutate({
                variables: { title: title, url: url, text: text },
            })
                .then(function (_a) {
                var data = _a.data;
                return router_1.default.push("/item?id=" + data.submitNewsItem.id);
            })
                .catch(function (reason) { return console.error(reason); }); },
        });
    },
})(Page);
exports.default = withData_1.default(function (props) { return (React.createElement(PageWithData, { currentURL: props.url.pathname })); });
//# sourceMappingURL=submit.js.map