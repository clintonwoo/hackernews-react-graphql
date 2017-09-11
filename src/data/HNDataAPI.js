import Firebase from 'firebase';
import fetch from 'isomorphic-fetch';
// const debug = require('debug');

import * as DB from './Database';
import sampleData from './SampleData';
import cache from './Cache';
import {
  HN_API_URL,
  HN_DB_URI,
  HN_API_VERSION,
} from '../config';
import {
  Feed,
} from './models';

Firebase.initializeApp({
  databaseURL: HN_DB_URI,
});
const api = Firebase.database().ref(HN_API_VERSION);


// https://github.com/HackerNews/API

/* BEGIN NEWS ITEMS */

export function fetchNewsItem(id) {
  console.log(`Fetching ${HN_API_URL}/item/${id}.json`);

  return new Promise((resolve, reject) => {
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
        reject(post);
      }
    }, reject);
  });

  // return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
  //   .then(response => response.json())
  //   .catch(reason => console.log(reason));
}

export function getFeed(feedType) {
  // Top stories are the front page
  console.log(`Fetching /${feedType}stories.json`);

  return new Promise((resolve, reject) => {
    api.child(`${feedType}stories`).once('value', (feedSnapshot) => {
      resolve(feedSnapshot.val());
    }, reject);
  });

  // return fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
  //   .then(response => response.json())
  //   .catch(reason => console.log(reason));
}

const rebuildFeed = (feedType) => {
  setTimeout(rebuildFeed, 1000 * 60 * 15, feedType);
  getFeed(feedType)
    .then(feed => Promise.all(feed.map(id => fetchNewsItem(id)))
      .then((newsItems) => {
        console.log(newsItems);
        newsItems.forEach((newsItem, index) => newsItem.rank = index + 1);
        Feed[`${feedType}NewsItems`] = newsItems;
        Feed[feedType] = feed;
        console.log(`Updated ${feedType} ids`);
      }),
    );
};

/* END NEWS ITEMS */

/* BEGIN SEED DATA */

export function seedCache() {
  // TODO: Build sample cache then seed
  console.log('Seeding cache');
  function delayedSeed() {
    ['top', 'new', 'show', 'ask', 'jobs'].forEach((feedType) => {
      rebuildFeed(feedType);
    });
  }

  console.log('Waiting 1 min before seeding the app with data.');
  setTimeout(delayedSeed, 1000 * 60 * 1);
  // Delay seeding the cache so we don't spam using Nodemon
}
/*  END SEED DATA */
