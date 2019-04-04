"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_apollo_1 = require("react-apollo");
var router_1 = require("next/router");
var NewsDetail_1 = require("../presentational/NewsDetail");
var hideNewsItem_1 = require("../../data/mutations/hideNewsItem");
exports.default = react_apollo_1.graphql(hideNewsItem_1.default, {
    props: function (_a) {
        var ownProps = _a.ownProps, mutate = _a.mutate;
        return ({
            hideNewsItem: function (id) {
                return mutate({
                    variables: { id: id },
                })
                    .catch(function () { return router_1.default.push('/login', "/hide?id=" + id + "&how=up&goto=news"); });
            },
            unhideNewsItem: function (id) {
                return mutate({
                    variables: { id: id },
                })
                    .catch(function () { return router_1.default.push('/login', "/unhide?id=" + id + "&how=up&goto=news"); });
            },
        });
    },
})(NewsDetail_1.default);
//# sourceMappingURL=NewsDetailWithData.js.map