import debug from 'debug';

import cache from '../Cache';
import * as HNDB from '../HNDataAPI';
import * as DB from '../Database';
import isValidUrl from '../../helpers/isValidUrl';

const logger = debug('app:NewsItem');

let newPostIdCounter = 100;

export default class NewsItem {
  constructor(props) {
    if (!props.id) throw new Error('Error instantiating News Item, id is required:', props.id);
    if (!props.submitterId) throw new Error('Error instantiating News Item, submitterId is required:', props.id);
    if (!props.title) throw new Error('Error instantiating News Item, title is required:', props.id);
    if (props.url && !isValidUrl(props.url)) throw new Error(`Error instantiating News Item ${props.id}, invalid URL: ${props.url}`);

    this.id = props.id || (newPostIdCounter += 1);
    this.creationTime = props.creationTime || +new Date();
    this.commentCount = props.commentCount || 0;
    this.comments = props.comments || [];
    this.hides = props.hides || [];
    this.submitterId = props.submitterId;
    this.text = props.text || null;
    this.title = props.title;
    this.upvotes = props.upvotes || [props.submitterId];
    this.upvoteCount = props.upvoteCount || 1;
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
      id: (newPostIdCounter += 1),
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
