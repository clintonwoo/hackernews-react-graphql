"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = require("debug");
var LRU = require("lru-cache");
var Models_1 = require("./Models");
var logger = debug_1.debug('app:Cache');
logger.log = console.log.bind(console);
function warmCache() {
    Models_1.FeedSingleton.getForType('TOP', 30, 0);
    Models_1.FeedSingleton.getForType('NEW', 30, 0);
    setTimeout(warmCache, 1000 * 60 * 15);
}
exports.warmCache = warmCache;
var Cache = (function () {
    function Cache() {
        this.isReady = false;
        this.newNewsItemsCache = new LRU({
            max: 500,
            maxAge: 1000 * 60 * 60,
        });
        this.newsItemsCache = new LRU({
            max: 1000,
            maxAge: 1000 * 60 * 60,
        });
        this.userCache = new LRU({
            max: 500,
            maxAge: 1000 * 60 * 60 * 2,
        });
        this.commentCache = new LRU({
            max: 5000,
            maxAge: 1000 * 60 * 60 * 1,
        });
    }
    Cache.prototype.getNewsItem = function (id) {
        return this.newsItemsCache.get(id);
    };
    Cache.prototype.setNewsItem = function (id, newsItem) {
        return this.newsItemsCache.set(id, newsItem);
    };
    Cache.prototype.getUser = function (id) {
        return this.userCache.get(id);
    };
    Cache.prototype.getUsers = function () {
        return this.userCache.dump();
    };
    Cache.prototype.setUser = function (id, user) {
        logger("Cache set user " + user);
        this.userCache.set(id, user);
        return user;
    };
    Cache.prototype.getComment = function (id) {
        return this.commentCache.get(id);
    };
    Cache.prototype.setComment = function (id, comment) {
        this.userCache.set(comment.id, comment);
        logger("Cache set comment " + comment);
        return comment;
    };
    return Cache;
}());
exports.cache = new Cache();
//# sourceMappingURL=Cache.js.map