import {
  HN_API_URL,
} from '../../config';

import data from '../SampleData';

// https://github.com/HackerNews/API

/* BEGIN NEWS ITEMS */


export function fetchNewsItem(id) {
  return data.topStoriesCache.find(item => item.id === id);
}

export function fetchComment(id) {
  return data.topStoriesCache[0].find(item => item.id === id);
}

// export function getFeed(feedType) {
//   return data[feedType];
// }

// const rebuildFeed = (feedType) => {
//   setTimeout(rebuildFeed, 1000 * 60 * 15, feedType);
//   getFeed(feedType)
//     .then(feed => Promise.all(feed.map(id => fetchNewsItem(id)))
//       .then((newsItems) => {
//         logger(newsItems);
//         Feed[`${feedType}NewsItems`] = newsItems;
//         Feed[feedType] = feed;
//         logger(`Updated ${feedType} ids`);
//       }),
//     )
//     .catch(reason => logger(`Error building feed: ${reason}`));
};

/* END NEWS ITEMS */

