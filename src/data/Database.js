import data from './SampleData';
import cache from './Cache';

/*                  BEGIN NEWS ITEMS                      */


export function getNewsItem(id) {
  return data.newsItems.find(newsItem => newsItem.id === id);
}

export function rankNewsItems() {
  // Would implement this somewhere in the real HN system
  // A scheduled job to recalculate post rank and points
  // .sort((a, b) => (a.rank - b.rank))
}

export function createNewsItem(newsItem) {
  data.newsItems.push(newsItem);
  return newsItem;
}

//                  NEWS ITEM MUTATIONS


export function upvoteNewsItem(id, userId) {
  // Upvote the News Item in the DB

  const newsItem = cache.getNewsItem(id); //data.newsItems.find(newsItem => newsItem.id === id);
  if (newsItem && !newsItem.upvotes.has(userId)) {
    newsItem.upvotes.add(userId);
    newsItem.upvoteCount += 1;
  }
  return newsItem;
}

export function downvoteNewsItem(id, userId) {
  const newsItemData = data.newsItems.find(newsItem => newsItem.id === id);
  newsItemData.downvotes.add(userId);
  newsItemData.downvoteCount += 1;

  return newsItemData;
}

export function submitNewsItem(id, newsItem) {
  // Submit the News Item in the DB
  if (cache.setNewsItem(id, newsItem)) return newsItem;
  throw new Error('Unable to submit News Item.');
}

/*                  END NEWS ITEMS                      */

/*                     BEGIN FEED                         */


export function getNewNewsItems(first, skip) {
  return data.new.slice(skip, skip + first)
    .map((postId, index) => ({
      ...getNewsItem(postId),
      rank: skip + index + 1,
    }));
}

export function getTopNewsItems(first, skip) {
  return data.newsItems.slice(skip, skip + first);
}

export function getHotNews() {
  return data.newsItems;
}

export function getNewsItems() {
  return data.newsItems;
}

/*                     END FEED                         */

/*                   BEGIN USERS                        */


export function getUser(id) {
  return data.users.find(user => user.id === id);
}

export function getUsers() {
  return data.users;
}

export function createUser(user) {
  data.users.push(user);
  return user;
}

/*                    END USERS                         */
