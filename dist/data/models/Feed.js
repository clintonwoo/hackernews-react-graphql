"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = require("debug");
var Cache_1 = require("../Cache");
var HNDB = require("../HNDataAPI");
var SampleData_1 = require("../SampleData");
var logger = debug_1.debug('app:Feed');
logger.log = console.log.bind(console);
var Feed = (function () {
    function Feed() {
        this.top = SampleData_1.sampleData.top;
        this.new = SampleData_1.sampleData.new;
        this.best = [];
        this.show = [];
        this.ask = [];
        this.job = [];
        this.topNewsItems = SampleData_1.sampleData.topStoriesCache;
        this.newNewsItems = SampleData_1.sampleData.topStoriesCache;
        this.bestNewsItems = SampleData_1.sampleData.topStoriesCache;
        this.showNewsItems = SampleData_1.sampleData.topStoriesCache;
        this.askNewsItems = SampleData_1.sampleData.topStoriesCache;
        this.jobNewsItems = SampleData_1.sampleData.topStoriesCache;
    }
    Feed.prototype.getForType = function (type, first, skip) {
        logger("Get first " + first + " " + type + " stories skip " + skip + ".");
        switch (type) {
            case 'TOP':
                return Promise.all(this.top.slice(skip, first + skip).map(function (id) { return Cache_1.cache.getNewsItem(id) || HNDB.fetchNewsItem(id); }));
            case 'NEW':
                return Promise.all(this.new.slice(skip, first + skip).map(function (id) { return Cache_1.cache.getNewsItem(id) || HNDB.fetchNewsItem(id); }));
            case 'BEST':
                return Promise.all(this.best.slice(skip, first + skip).map(function (id) { return Cache_1.cache.getNewsItem(id) || HNDB.fetchNewsItem(id); }));
            case 'SHOW':
                return this.showNewsItems.slice(skip, first + skip);
            case 'ASK':
                return this.askNewsItems.slice(skip, first + skip);
            case 'JOB':
                return this.jobNewsItems.slice(skip, first + skip);
            default:
                return SampleData_1.sampleData.newsItems.slice(skip, skip + first);
        }
    };
    return Feed;
}());
exports.FeedSingleton = new Feed();
//# sourceMappingURL=Feed.js.map