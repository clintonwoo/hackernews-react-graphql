"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_apollo_1 = require("react-apollo");
var router_1 = require("next/router");
var NewsTitle_1 = require("../presentational/NewsTitle");
var upvoteNewsItem_1 = require("../../data/mutations/upvoteNewsItem");
exports.default = react_apollo_1.graphql(upvoteNewsItem_1.default, {
    props: function (_a) {
        var ownProps = _a.ownProps, mutate = _a.mutate;
        return ({
            upvoteNewsItem: function (id) {
                return mutate({
                    variables: { id: id },
                })
                    .catch(function () { return router_1.default.push('/login', "/vote?id=" + id + "&how=up&goto=news"); });
            },
        });
    },
})(NewsTitle_1.default);
//# sourceMappingURL=NewsTitleWithData.js.map