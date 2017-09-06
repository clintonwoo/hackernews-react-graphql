import data from './SampleData';

// TODO: Add scheduled job to recalculate post rank and points

// TODO: Implement caching in-memory or using caching app e.g. Memcached, Redis 

// Rank News Items
export function rankNewsItems() {
  
}

/* NEWS ITEMS */
export function getNewsFeed() {
  // Needs pagination
  return data.newsItems;
}
export function getNewsItems() {
  // Needs pagination
  return data.newsItems;
}
export function getNewsItem(id) {
  return data.newsItems.find(newsItem => newsItem.id === id);
}
export function createNewsItem(newsItem) {
  data.newsItems.push(newsItem);
  return newsItem;
}
export function upvoteNewsItem(id, userId) {
  const newsItemData = data.newsItems.find(newsItem => newsItem.id === id);
  newsItemData.upvotes.add(userId);
  // Counting logic should be internal to the database
  newsItemData.upvoteCount += 1;

  return newsItemData;
}
export function downvoteNewsItem(id, userId) {
  const newsItemData = data.newsItems.find(newsItem => newsItem.id === id);
  newsItemData.downvotes.add(userId);
  // Counting logic should be internal to the database
  newsItemData.downvoteCount += 1;

  return newsItemData;
}

/* USERS */
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
