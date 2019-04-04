"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
var link_1 = require("next/link");
var React = require("react");
var react_render_html_1 = require("react-render-html");
var convertNumberToTimeAgo_1 = require("../../helpers/convertNumberToTimeAgo");
exports.Comment = function (props) {
    var vote = function () {
        console.log(_this);
    };
    var toggle = function () {
        console.log(_this);
    };
    return (React.createElement("tr", { className: "athing comtr ", id: "15238246" },
        React.createElement("td", null,
            React.createElement("table", { style: { border: '0' } },
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", { className: "ind" },
                            React.createElement("img", { alt: "", src: "/static/s.gif", height: "1", width: props.indentationLevel * 40 + "px" })),
                        React.createElement("td", { style: { verticalAlign: 'top' }, className: "votelinks" },
                            React.createElement("center", null,
                                React.createElement("a", { id: "up_15238246", onClick: vote, href: "vote?id=15238246&how=up&auth=4eb97bf0d2568aa743691210b904f0c5182bb0fc&goto=item%3Fid%3D15237896#15238246" },
                                    React.createElement("div", { className: "votearrow", title: "upvote" })))),
                        React.createElement("td", { className: "default" },
                            React.createElement("div", { style: { marginTop: '2px', marginBottom: '-10px' } },
                                React.createElement("span", { className: "comhead" },
                                    React.createElement(link_1.default, { prefetch: true, href: "/user?id=mstade" },
                                        React.createElement("a", { className: "hnuser" }, props.submitterId)),
                                    React.createElement("span", { className: "age" },
                                        ' ',
                                        React.createElement(link_1.default, { prefetch: true, href: "/item?id=" + props.id },
                                            React.createElement("a", null, convertNumberToTimeAgo_1.convertNumberToTimeAgo(props.creationTime)))),
                                    ' ',
                                    React.createElement("span", { id: "unv_15238246" }),
                                    React.createElement("span", { className: "par" }),
                                    ' ',
                                    React.createElement("a", { className: "togg", id: "24", href: "javascript:void(0)", onClick: toggle }, "[-]"),
                                    React.createElement("span", { className: "storyon" }))),
                            React.createElement("br", null),
                            React.createElement("div", { className: "comment" },
                                React.createElement("span", { className: "c00" },
                                    React.createElement("span", null, react_render_html_1.default(props.text)),
                                    React.createElement("div", { className: "reply" },
                                        React.createElement("p", null,
                                            React.createElement("font", { size: "1" },
                                                React.createElement("u", null,
                                                    React.createElement(link_1.default, { prefetch: true, href: "/reply?id=" + props.id + "&goto=item%3Fid%3D" + props.id },
                                                        React.createElement("a", null, "reply")))))))))))))));
};
exports.Comment.propTypes = {
    id: PropTypes.number.isRequired,
    creationTime: PropTypes.number.isRequired,
    indentationLevel: PropTypes.number.isRequired,
    submitterId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};
exports.Comment.fragments = {
    comment: graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    fragment Comment on Comment {\n      id\n      creationTime\n      comments {\n        id\n        creationTime\n        submitterId\n        text\n      }\n      submitterId\n      text\n    }\n  "], ["\n    fragment Comment on Comment {\n      id\n      creationTime\n      comments {\n        id\n        creationTime\n        submitterId\n        text\n      }\n      submitterId\n      text\n    }\n  "]))),
};
var templateObject_1;
//# sourceMappingURL=Comment.js.map