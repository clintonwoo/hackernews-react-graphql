import debug from 'debug';

import cache from '../Cache';
import * as HNDB from '../HNDataAPI';
import * as DB from '../Database';

const logger = debug('app:NewsItem');

let newPostIdCounter = 100;

export default class NewsItem {
  constructor(props) {
    if (!props.id) throw new Error('Instantiating News Item failed, id is required:', props.id);
    if (!props.submitterId) throw new Error('Instantiating News Item failed, submitterId is required:', props.id);
    if (!props.title) throw new Error('Instantiating News Item failed, title is required:', props.id);

    this.id = props.id || (newPostIdCounter += 1);
    this.creationTime = props.creationTime || +new Date();
    this.commentCount = props.commentCount || 0;
    this.comments = props.comments || [];
    this.hides = props.hides || [];
    this.submitterId = props.submitterId;
    this.text = props.text || null;
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

  static submitNewsItem = ({ submitterId, title, text, url }) => {
    const newsItem = new NewsItem({
      submitterId,
      text,
      title,
      url,
      upvotes: [submitterId],
      upvoteCount: 1,
    });
    return DB.submitNewsItem(newsItem.id, newsItem);
  };
}
