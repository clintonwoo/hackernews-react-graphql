"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = require("debug");
var Cache_1 = require("../Cache");
var HNDB = require("../HNDataAPI");
var logger = debug_1.debug('app:Comment');
var Comment = (function () {
    function Comment(props) {
        if (!props.id)
            throw new Error("Error instantiating Comment, id invalid: " + props.id);
        if (!props.parent)
            throw new Error("Error instantiating Comment, parent invalid: " + props.parent);
        if (!props.submitterId)
            throw new Error("Error instantiating Comment, submitterId invalid: " + props.submitterId);
        if (!props.text)
            throw new Error("Error instantiating Comment, text invalid: " + props.text);
        this.id = props.id;
        this.creationTime = props.creationTime || +new Date();
        this.comments = props.comments || [];
        this.parent = props.parent;
        this.submitterId = props.submitterId;
        this.text = props.text;
    }
    Comment.getComment = function (id) {
        return Cache_1.cache.getComment(id) || HNDB.fetchComment(id).catch(function (reason) { return logger("Rejected comment: " + reason); });
    };
    Comment.getComments = function (ids) {
        return Promise.all(ids.map(function (commentId) { return Comment.getComment(commentId); }))
            .then(function (comments) { return comments.filter(function (comment) { return comment !== undefined; }); })
            .catch(function (reason) { return logger("Rejected comments: " + reason); });
    };
    return Comment;
}());
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map