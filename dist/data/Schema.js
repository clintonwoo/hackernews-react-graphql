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
var debug_1 = require("debug");
var graphql_1 = require("graphql");
var graphql_tools_1 = require("graphql-tools");
var language_1 = require("graphql/language");
var logger = debug_1.debug('app:Schema');
logger.log = console.log.bind(console);
exports.typeDefs = "\n  type Comment {\n    id: Int!\n\n    creationTime: Date!\n\n    comments: [Comment]!\n\n    # The ID of the item to which the comment was made on\n    parent: Int!\n\n    # The ID of the user who submitted the comment\n    submitterId: String!\n\n    text: String\n\n    # Whether the currently logged in user has upvoted the comment\n    upvoted: Boolean!\n\n    # The User who submitted the comment\n    author: User\n  }\n\n  scalar Date\n\n  # A list of options for the sort order of the feed\n  enum FeedType {\n    # Sort by a combination of freshness and score, using an algorithm (Could use Reddit's)\n    TOP\n  \n    # Newest entries first\n    NEW\n\n    # Sort by score\n    BEST\n\n    # SHOW HN articles\n    SHOW\n\n    # ASK HN articles\n    ASK\n\n    # Job listings\n    JOB\n  }\n  \n  type NewsItem {\n\n    id: Int!\n\n    comments: [Comment]!\n\n    commentCount: Int!\n\n    creationTime: Date!\n\n    # List of user ids who have hidden this post\n    hides: [String]!\n\n    # Whether the currently logged in user has hidden the post\n    hidden: Boolean!\n\n    # The ID of the news item submitter\n    submitterId: String!\n\n    # The news item headline\n    title: String!\n\n    text: String\n\n    # Whether the currently logged in user has upvoted the post\n    upvoted: Boolean!\n\n    upvotes: [String]!\n\n    upvoteCount: Int!\n\n    url: String\n\n    # Fetches the author based on submitterId\n    author: User\n  }\n\n  type User {\n    # The user ID is a string of the username\n    id: String!\n\n    about: String\n\n    creationTime: Date!\n\n    dateOfBirth: Date\n\n    email: String\n\n    favorites: [Int]\n\n    firstName: String\n\n    hides: [Int]!\n\n    karma: Int!\n\n    lastName: String\n\n    likes: [Int]!\n    \n    posts: [Int]!\n  }\n\n  # the schema allows the following queries:\n  type Query {\n    # A comment, it's parent could be another comment or a news item.\n    comment(id: Int!): Comment\n\n    feed(\n      # The sort order for the feed\n      type: FeedType!,\n\n      # The number of items to fetch (starting from the skip index), for pagination\n      first: Int\n\n      # The number of items to skip, for pagination\n      skip: Int,    \n    ): [NewsItem]\n\n    # The currently logged in user or null if not logged in\n    me: User\n\n    # A news item\n    newsItem(id: Int!): NewsItem\n\n    # A user\n    user(id: String!): User\n  }\n\n  # This schema allows the following mutations:\n  type Mutation {\n    upvoteNewsItem (\n      id: Int!\n    ): NewsItem\n\n    hideNewsItem (\n      id: Int!\n    ): NewsItem\n\n    submitNewsItem (\n      title: String!\n      url: String\n      text: String\n    ): NewsItem\n  }\n\n";
exports.resolvers = {
    Query: {
        comment: function (_, _a, context) {
            var id = _a.id;
            return context.Comment.getComment(id);
        },
        feed: function (root, _a, context) {
            var type = _a.type, first = _a.first, skip = _a.skip;
            var limit = first < 1 || first > 30 ? 30 : first;
            return context.Feed.getForType(type, limit, skip);
        },
        me: function (_, __, context) {
            logger('Me: userId:', context.userId);
            return context.userId && context.User.getUser(context.userId);
        },
        newsItem: function (_, _a, context) {
            var id = _a.id;
            return context.NewsItem.getNewsItem(id);
        },
        user: function (_, _a, context) {
            var id = _a.id;
            return context.User.getUser(id);
        },
    },
    Mutation: {
        upvoteNewsItem: function (_, _a, context) {
            var id = _a.id;
            if (!context.userId)
                throw new Error('Must be logged in to vote.');
            return context.NewsItem.upvoteNewsItem(id, context.userId);
        },
        hideNewsItem: function (_, _a, context) {
            var id = _a.id;
            if (!context.userId)
                throw new Error('Must be logged in to hide post.');
            return context.NewsItem.hideNewsItem(id, context.userId);
        },
        submitNewsItem: function (_, newsItem, context) {
            if (!context.userId)
                throw new Error('Must be logged in to submit a news item.');
            return context.NewsItem.submitNewsItem(__assign({}, newsItem, { submitterId: context.userId }));
        },
    },
    Comment: {
        author: function (comment, _, context) { return context.User.getUser(comment.submitterId); },
        comments: function (comment, _, context) { return context.Comment.getComments(comment.comments); },
        upvoted: function (comment, _, context) { return comment.upvotes.includes(context.userId); },
    },
    Date: new graphql_1.GraphQLScalarType({
        name: 'Date',
        description: 'UTC number of milliseconds since midnight Jan 1 1970 as in JS date',
        parseValue: function (value) {
            return new Date(value).valueOf();
        },
        serialize: function (value) {
            if (value instanceof Date)
                return value.valueOf();
            return value;
        },
        parseLiteral: function (ast) {
            if (ast.kind === language_1.Kind.INT) {
                return parseInt(ast.value, 10);
            }
            return null;
        },
    }),
    NewsItem: {
        author: function (newsItem, _, context) { return context.User.getUser(newsItem.submitterId); },
        comments: function (newsItem, _, context) { return context.Comment.getComments(newsItem.comments); },
        hidden: function (newsItem, _, context) { return newsItem.hides.includes(context.userId); },
        upvoted: function (newsItem, _, context) { return newsItem.upvotes.includes(context.userId); },
    },
    User: {
        posts: function (user, _, context) { return context.User.getPostsForUser(user.id); },
    },
};
exports.schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: exports.typeDefs,
    resolvers: exports.resolvers,
});
//# sourceMappingURL=Schema.js.map