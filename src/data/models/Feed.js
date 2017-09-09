import Firebase from 'firebase';
import debug from 'debug';

import sampleData from '../SampleData';
import * as DB from '../Database';
import * as HNDB from '../HNDataAPI';
import cache from '../Cache';
import {
  HN_API_URL,
  HN_DB_URI,
  HN_API_VERSION,
} from '../../config';

const logger = debug('app:HNDataAPI');
logger.log = console.log.bind(console);

Firebase.initializeApp({
  databaseURL: HN_DB_URI,
});
const api = Firebase.database().ref(HN_API_VERSION);

class Feed {
  constructor() {
    console.log('feed constructor');
    ['top', 'new', 'show', 'ask', 'jobs'].forEach((feedType) => {
      this.rebuildNews(feedType);
    });
  }
  getForType(type, first, skip) {
    switch (type) {
      case 'HOT': {
        return this.topNewsItems.slice(skip, first + skip);
      }
      case 'NEW':
        return this.newNewsItems.slice(skip, first + skip);
      case 'TOP':
        if (cache.isReady) return cache.getTopNewsItems(first, skip);
        return DB.getTopNewsItems(first, skip);
      default:
        return sampleData.newsItems.slice(skip, skip + first);
    }
  }

  rebuildNews = (feedType) => {
    setTimeout(this.rebuildNews, 1000 * 60 * 15, feedType);
    api.child(`${feedType}stories`).once('value', (feedSnapshot) => {
      this[feedType] = feedSnapshot.val();
      console.log(`Updated ${feedType} ids`);
      Promise.all(
        this[feedType].map(id => new Promise((resolve, reject) => {
          api.child(`item/${id}`).once('value', (postSnapshot) => {
            const post = postSnapshot.val();
            if (post !== null) {
              const newsItem = {
                id: post.id,
                creationTime: post.time * 1000,
                commentCount: post.descendants || 0,
                points: post.score,
                submitterId: post.by,
                title: post.title,
                url: post.url,
              };
              cache.setNewsItem(newsItem);
              console.log(`Created Post: ${post.id}`);
              resolve(newsItem);
            } else {
              debugger
              reject(post);
            }
          }, reject);
        })),
      )
        .then((newsItems) => {
          console.log(newsItems);
          newsItems.forEach((newsItem, index) => newsItem.rank = index + 1);
          this[`${feedType}NewsItems`] = newsItems;
        });
    });
  }
  // rebuildHotNews() {
  //   setTimeout(this.rebuildHotNews, 1000 * 60 * 15);
  //   return HNDB.gettopNewsItems()
  //     .then(topPostIDs => Promise.all(
  //       topPostIDs.map(id => HNDB.fetchNewsItem(id)
  //         .then((post) => {
  //           cache.setNewsItem({
  //             id: post.id,
  //             creationTime: post.time * 1000,
  //             commentCount: post.descendants || 0,
  //             points: post.score,
  //             submitterId: post.by,
  //             title: post.title,
  //             url: post.url,
  //           });
  //           logger(`created Post ${post.id}`);
  //         })))
  //       .then((hotNews) => {
  //         console.log(hotNews)
  //         this.top = topPostIDs;
  //         this.topNewsItems = hotNews.map((newsItem, index) => ({ ...newsItem, rank: index }));
  //       }));
  // }
  // rebuildNewNews()


  /* Arrays of post ids in descending rank order */
  top = sampleData.top;
  new = sampleData.new;
  show = [];
  ask = [];
  job = [];
  
  /* A pre constructed cache of news feeds */
  topNewsItems = sampleData.topStoriesCache;
  newNewsItems = [];
  showNewsItems = [];
  askNewsItems = [];
  jobNewsItems = [];

  /*                     BEGIN FEED                         */

  gettopNewsItems(first, skip) {
    return this.top.slice(skip, skip + first)
      .map((postId, index) => ({
        ...this.getNewsItem(postId),
        rank: skip + index + 1,
      }));
  }

  getNewNewsItems(first, skip) {
    return this.new.slice(skip, skip + first)
      .map((postId, index) => ({
        ...this.getNewsItem(postId),
        rank: skip + index + 1,
      }));
  }

  getTopNewsItems(first, skip) {
    return this.top.slice(skip, skip + first)
      .map((postId, index) => ({
        ...this.getNewsItem(postId),
        rank: skip + index + 1,
      }));
  }

  /*                     END FEED                         */
}

export default new Feed();
