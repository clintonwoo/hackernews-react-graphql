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
var Cache_1 = require("./Cache");
var Models_1 = require("./Models");
var SampleData_1 = require("./SampleData");
var logger = debug_1.debug('app:Database');
logger.log = console.log.bind(console);
function getNewsItem(id) {
    return SampleData_1.sampleData.newsItems.find(function (newsItem) { return newsItem.id === id; });
}
exports.getNewsItem = getNewsItem;
function rankNewsItems() {
}
exports.rankNewsItems = rankNewsItems;
function createNewsItem(newsItem) {
    SampleData_1.sampleData.newsItems.push(newsItem);
    return newsItem;
}
exports.createNewsItem = createNewsItem;
function upvoteNewsItem(id, userId) {
    var newsItem = Cache_1.cache.getNewsItem(id);
    if (newsItem && !newsItem.upvotes.includes(userId)) {
        newsItem.upvotes.push(userId);
        newsItem.upvoteCount += 1;
        Cache_1.cache.setNewsItem(id, newsItem);
    }
    return newsItem;
}
exports.upvoteNewsItem = upvoteNewsItem;
function unvoteNewsItem(id, userId) {
    var newsItem = Cache_1.cache.getNewsItem(id);
    if (newsItem && !newsItem.upvotes.includes(userId)) {
        newsItem.upvotes.splice(newsItem.upvotes.indexOf(userId), 1);
        newsItem.upvoteCount -= 1;
        Cache_1.cache.setNewsItem(id, newsItem);
    }
    return newsItem;
}
exports.unvoteNewsItem = unvoteNewsItem;
function hideNewsItem(id, userId) {
    logger("Hiding News Item " + id + " by " + userId);
    var newsItem = Cache_1.cache.getNewsItem(id);
    var user = Cache_1.cache.getUser(userId);
    if (user && !user.hides.includes(id) && newsItem && !newsItem.hides.includes(userId)) {
        user.hides.push(id);
        Cache_1.cache.setUser(id, user);
        newsItem.hides.push(userId);
        Cache_1.cache.setNewsItem(id, newsItem);
        logger("Hid News Item " + id + " by " + userId);
    }
    else
        throw new Error("Data error, user has already hidden " + id + " by " + userId);
    return newsItem;
}
exports.hideNewsItem = hideNewsItem;
function submitNewsItem(id, newsItem) {
    if (Cache_1.cache.setNewsItem(id, newsItem)) {
        Models_1.FeedSingleton.new.unshift(id);
        Models_1.FeedSingleton.new.pop();
        return newsItem;
    }
    throw new Error('Unable to submit News Item.');
}
exports.submitNewsItem = submitNewsItem;
function getNewNewsItems(first, skip) {
    return SampleData_1.sampleData.new.slice(skip, skip + first).map(function (postId, index) { return (__assign({}, getNewsItem(postId), { rank: skip + index + 1 })); });
}
exports.getNewNewsItems = getNewNewsItems;
function getTopNewsItems(first, skip) {
    return SampleData_1.sampleData.newsItems.slice(skip, skip + first);
}
exports.getTopNewsItems = getTopNewsItems;
function getHotNews() {
    return SampleData_1.sampleData.newsItems;
}
exports.getHotNews = getHotNews;
function getNewsItems() {
    return SampleData_1.sampleData.newsItems;
}
exports.getNewsItems = getNewsItems;
function getUser(id) {
    return SampleData_1.sampleData.users.find(function (user) { return user.id === id; });
}
exports.getUser = getUser;
function getUsers() {
    return SampleData_1.sampleData.users;
}
exports.getUsers = getUsers;
function createUser(user) {
    SampleData_1.sampleData.users.push(user);
    return user;
}
exports.createUser = createUser;
//# sourceMappingURL=Database.js.map