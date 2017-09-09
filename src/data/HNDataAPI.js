import fetch from 'isomorphic-fetch';

import * as DB from './Database';
import sampleData from './SampleData';
import cache from './Cache';
import {
  HN_API_URL,
} from '../config';
import debug from '../helpers/logger';

// https://github.com/HackerNews/API

/* BEGIN NEWS ITEMS */


export function fetchNewsItem(id) {
  debug(`Fetching ${HN_API_URL}/item/${id}.json`);
  return fetch(`${HN_API_URL}/item/${id}.json`)
    .then(response => response.json());
}

export function getHotNewsItems() {
  // Top stories are the front page
  debug(`Fetching ${HN_API_URL}/topstories.json`);
  return fetch(`${HN_API_URL}/topstories.json`)
    .then(response => response.json())
    .catch(reason => debug(reason));
}

/* END */

/* BEGIN SEED DATA */


function seedTopStories() {
  // Top stories = front page
  fetch(`${HN_API_URL}/topstories.json`)
    .then(response => response.json())
    .then((topPostIDs) => {
      // Replace sample data with live data
      sampleData.hot = topPostIDs;

      // Sequentially fetch URL's
      topPostIDs.reduce((previous, postId) =>
        previous.then(() => {
          debug(`making request to ${HN_API_URL}/item/${postId}.json`);
          return fetch(`${HN_API_URL}/item/${postId}.json`)
            .then((post) => {
              DB.createNewsItem({
                id: post.id,
                creationTime: post.time * 1000,
                commentCount: post.descendants || 0,
                points: post.score,
                submitterId: post.by,
                title: post.title,
                url: post.url,
              });
              debug(`created Post ${postId}`);
            })
            .catch(reason => debug(reason));
        }),
      Promise.resolve());

      // data.forEach(postId =>
      //   fetch(`${HN_API_URL}/item/${postId}.json`)
      //     .then(response => response.json())
      //     .then(post => DB.createNewsItem({
      //       id: post.id,
      //       creationTime: post.time * 1000,
      //       commentCount: post.descendants || 0,
      //       points: post.score,
      //       submitterId: post.by,
      //       title: post.title,
      //       url: post.url,
      //     })),
      // );
    })
    .catch(reason => debug(reason));
  setTimeout(seedTopStories, 1000 * 60 * 5);
}

function seedNewStories() {
  // New stories = newest
  fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
    .then(response => response.json())
    .then((data) => {
      // Replace sample data with live data
      sampleData.new = data;

      data.forEach(postId =>
        fetch(`${HN_API_URL}/item/${postId}.json`)
          .then(response => response.json())
          .then(post => DB.createNewsItem({
            id: post.id,
            creationTime: post.time * 1000,
            commentCount: post.descendants || 0,
            points: post.score,
            submitterId: post.by,
            title: post.title,
            url: post.url,
          })),
      );
    })
    .catch(reason => debug(reason));
  setTimeout(seedNewStories, 1000 * 60 * 1);
}

export function seedCache() {
  // TODO: Build sample cache then seed
  


  // seedTopStories();
  // seedNewStories();
}
/*  END SEED DATA */
