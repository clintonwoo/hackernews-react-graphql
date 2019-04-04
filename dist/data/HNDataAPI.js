"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = require("debug");
var Firebase = require("firebase");
var Cache_1 = require("./Cache");
var Models_1 = require("./Models");
var config_1 = require("../config");
var logger = debug_1.debug('app:HNDataAPI');
logger.log = console.log.bind(console);
Firebase.initializeApp({
    databaseURL: config_1.HN_DB_URI,
});
var api = Firebase.database().ref(config_1.HN_API_VERSION);
function fetchNewsItem(id) {
    logger("Fetching post " + config_1.HN_API_URL + "/item/" + id + ".json");
    return api
        .child("item/" + id)
        .once('value')
        .then(function (postSnapshot) {
        var post = postSnapshot.val();
        if (post !== null) {
            var newsItem = new Models_1.NewsItem({
                id: post.id,
                creationTime: post.time * 1000,
                commentCount: post.descendants,
                comments: post.kids,
                submitterId: post.by,
                title: post.title,
                upvoteCount: post.score,
                url: post.url,
            });
            Cache_1.cache.setNewsItem(newsItem.id, newsItem);
            logger("Created Post: " + post.id);
            return newsItem;
        }
        throw post;
    })
        .catch(function (reason) { return logger("Fetching post failed: " + reason); });
}
exports.fetchNewsItem = fetchNewsItem;
function fetchComment(id) {
    logger("Fetching comment " + config_1.HN_API_URL + "/item/" + id + ".json");
    return api
        .child("item/" + id)
        .once('value')
        .then(function (itemSnapshot) {
        var item = itemSnapshot.val();
        if (item !== null && !item.deleted && !item.dead) {
            var comment = new Models_1.Comment({
                id: item.id,
                creationTime: item.time * 1000,
                comments: item.kids,
                parent: item.parent,
                submitterId: item.by,
                text: item.text,
            });
            Cache_1.cache.setComment(comment.id, comment);
            logger("Created Comment: " + item.id);
            return comment;
        }
        throw item;
    })
        .catch(function (reason) { return logger("Fetching comment failed: " + reason); });
}
exports.fetchComment = fetchComment;
function fetchUser(id) {
    logger("Fetching user " + config_1.HN_API_URL + "/user/" + id + ".json");
    return api
        .child("user/" + id)
        .once('value')
        .then(function (itemSnapshot) {
        var item = itemSnapshot.val();
        if (item !== null && !item.deleted && !item.dead) {
            var user = new Models_1.User({
                id: item.id,
                about: item.about,
                creationTime: item.created * 1000,
                karma: item.karma,
                posts: item.submitted,
            });
            Cache_1.cache.setUser(user.id, user);
            logger("Created User: " + item.id, item);
            return user;
        }
        throw item;
    })
        .catch(function (reason) { return logger("Fetching user failed: " + reason); });
}
exports.fetchUser = fetchUser;
function getFeed(feedType) {
    logger("Fetching /" + feedType + "stories.json");
    return api
        .child(feedType + "stories")
        .once('value')
        .then(function (feedSnapshot) { return feedSnapshot.val(); })
        .then(function (feed) { return feed.filter(function (newsItem) { return newsItem !== undefined && newsItem !== null; }); })
        .catch(function (reason) { return logger("Fetching news feed failed: " + reason); });
}
exports.getFeed = getFeed;
var rebuildFeed = function (feedType) {
    setTimeout(rebuildFeed, 1000 * 60 * 15, feedType);
    getFeed(feedType)
        .then(function (feed) {
        return Promise.all(feed.map(function (id) { return fetchNewsItem(id); })).then(function (newsItems) {
            logger(newsItems);
            Models_1.FeedSingleton[feedType + "NewsItems"] = newsItems.filter(function (newsItem) { return newsItem !== undefined && newsItem !== null; });
            Models_1.FeedSingleton[feedType] = feed;
            logger("Updated " + feedType + " ids");
        });
    })
        .catch(function (reason) { return logger("Error building feed: " + reason); });
};
function seedCache(delay) {
    logger("Waiting " + delay + " ms before seeding the app with data.");
    setTimeout(function () {
        logger('Seeding cache');
        ['top', 'new', 'best', 'show', 'ask', 'job'].forEach(function (feedType) {
            rebuildFeed(feedType);
        });
    }, delay);
}
exports.seedCache = seedCache;
//# sourceMappingURL=HNDataAPI.js.map