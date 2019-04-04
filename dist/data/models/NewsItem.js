"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = require("debug");
var Cache_1 = require("../Cache");
var HNDB = require("../HNDataAPI");
var DB = require("../Database");
var isValidUrl_1 = require("../../helpers/isValidUrl");
var logger = debug_1.debug('app:NewsItem');
var newPostIdCounter = 100;
var NewsItem = (function () {
    function NewsItem(props) {
        if (!props.id) {
            throw new Error("Error instantiating News Item, id is required: " + props.id);
        }
        if (!props.submitterId) {
            throw new Error("Error instantiating News Item, submitterId is required: " + props.id);
        }
        if (!props.title) {
            throw new Error("Error instantiating News Item, title is required: " + props.id);
        }
        if (props.url && !isValidUrl_1.isValidUrl(props.url)) {
            throw new Error("Error instantiating News Item " + props.id + ", invalid URL: " + props.url);
        }
        this.id = props.id || (newPostIdCounter += 1);
        this.commentCount = props.commentCount || 0;
        this.comments = props.comments || [];
        this.creationTime = props.creationTime || +new Date();
        this.hides = props.hides || [];
        this.submitterId = props.submitterId;
        this.text = props.text || null;
        this.title = props.title;
        this.upvoteCount = props.upvoteCount || 1;
        this.upvotes = props.upvotes || [props.submitterId];
        this.url = props.url;
    }
    NewsItem.getNewsItem = function (id) { return Cache_1.cache.getNewsItem(id) || DB.getNewsItem(id) || HNDB.fetchNewsItem(id); };
    NewsItem.getNewsItems = function (ids) {
        return Promise.all(ids.map(function (id) { return NewsItem.getNewsItem(id); }))
            .then(function (newsItems) { return newsItems.filter(function (newsItem) { return newsItem !== undefined; }); })
            .catch(function (reason) { return logger("Rejected News Items: " + reason); });
    };
    NewsItem.upvoteNewsItem = function (id, userId) { return DB.upvoteNewsItem(id, userId); };
    NewsItem.hideNewsItem = function (id, userId) { return DB.hideNewsItem(id, userId); };
    NewsItem.submitNewsItem = function (_a) {
        var submitterId = _a.submitterId, title = _a.title, text = _a.text, url = _a.url;
        var newsItem = new NewsItem({
            id: newPostIdCounter += 1,
            submitterId: submitterId,
            text: text,
            title: title,
            url: url,
            upvotes: [submitterId],
            upvoteCount: 1,
        });
        return DB.submitNewsItem(newsItem.id, newsItem);
    };
    return NewsItem;
}());
exports.NewsItem = NewsItem;
//# sourceMappingURL=NewsItem.js.map