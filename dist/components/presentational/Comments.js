"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var React = require("react");
var graphql_tag_1 = require("graphql-tag");
var Comment_1 = require("./Comment");
exports.Comments = function (props) {
    var rows = [];
    function buildComment(comment, indent) {
        return React.createElement(Comment_1.Comment, __assign({ key: comment.id, parentId: comment.parent, indentationLevel: indent }, comment));
    }
    props.newsItem.comments.forEach(function (rootComment) {
        rows.push(buildComment(rootComment, 0));
        rootComment.comments.forEach(function (commentOne) {
            rows.push(buildComment(commentOne, 1));
            commentOne.comments.forEach(function (commentTwo) {
                rows.push(buildComment(commentTwo, 2));
                commentTwo.comments.forEach(function (commentThree) {
                    rows.push(buildComment(commentThree, 3));
                    commentThree.comments.forEach(function (commentFour) {
                        rows.push(buildComment(commentFour, 4));
                        commentFour.comments.forEach(function (commentFive) {
                            rows.push(buildComment(commentFive, 5));
                        });
                    });
                });
            });
        });
    });
    return (React.createElement("table", { className: "comment-tree", style: { border: '0' } },
        React.createElement("tbody", null, rows)));
};
exports.Comments.propTypes = {
    newsItem: PropTypes.shape({
        id: PropTypes.number.isRequired,
        comments: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            creationTime: PropTypes.number.isRequired,
            submitterId: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
        })).isRequired,
    }).isRequired,
};
exports.Comments.fragments = {
    comment: graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    fragment Comments on Comment {\n      id\n      comments {\n        id\n        comments {\n          id\n          comments {\n            id\n            comments {\n              id\n              ...Comment\n            }\n            ...Comment\n          }\n          ...Comment\n        }\n        ...Comment\n      }\n      ...Comment\n    }\n    ", "\n  "], ["\n    fragment Comments on Comment {\n      id\n      comments {\n        id\n        comments {\n          id\n          comments {\n            id\n            comments {\n              id\n              ...Comment\n            }\n            ...Comment\n          }\n          ...Comment\n        }\n        ...Comment\n      }\n      ...Comment\n    }\n    ", "\n  "])), Comment_1.Comment.fragments.comment),
};
var templateObject_1;
//# sourceMappingURL=Comments.js.map