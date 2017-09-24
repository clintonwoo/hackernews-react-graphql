import debug from 'debug';

import cache from '../Cache';
import * as HNDB from '../HNDataAPI';
import * as DB from '../Database';

const logger = debug('app:NewsItem');

let newPostIdCounter = 100;

export default class NewsItem {
  constructor(props) {
    this.id = props.id;
    this.creationTime = props.creationTime || +new Date();
    this.commentCount = props.commentCount || 0;
    this.comments = props.comments || [];
    this.hides = props.hides || [];
    this.submitterId = props.submitterId;
    this.title = props.title;
    this.upvotes = props.upvotes || [];
    this.upvoteCount = props.upvoteCount || 0;
    this.url = props.url;
  }

  static getNewsItem = id =>
    cache.getNewsItem(id) || DB.getNewsItem(id) || HNDB.fetchNewsItem(id);

  static getNewsItems = ids =>
    Promise.all(ids.map(id => NewsItem.getNewsItem(id)))
      .then(newsItems => newsItems.filter(newsItem => newsItem !== undefined))
      .catch(reason => logger(`Rejected News Items: ${reason}`));

  static upvoteNewsItem = (id, userId) => DB.upvoteNewsItem(id, userId);

  static hideNewsItem = (id, userId) => DB.hideNewsItem(id, userId);

  static submitNewsItem = ({ submitterId, text, url }) => {
    const newsItem = new NewsItem({
      id: newPostIdCounter += 1,
      comments: [],
      commentCount: 0,
      creationTime: new Date().valueOf(),
      hides: [],
      hiddenCount: 0,
      submitterId,
      text: text || null,
      url: url || null,
      upvotes: [submitterId],
      upvoteCount: 1,
    });
    return DB.submitNewsItem(newsItem.id, newsItem);
  };
}
