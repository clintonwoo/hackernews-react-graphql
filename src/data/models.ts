/*
  Models are like data controllers
  They interact with the Cache and DB
*/

// GraphQL supports promises so models can return them

export { FeedSingleton } from './models/feed';
export { NewsItem } from './models/news-item';
export { User } from './models/user';
export { Comment } from './models/comment';
