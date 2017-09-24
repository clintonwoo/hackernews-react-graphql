
/*
  Models are like data controllers
  They interact with the Cache and DB
*/

// GraphQL supports promises so models can return them

export { default as Feed } from './models/Feed';
export { default as NewsItem } from './models/NewsItem';
export { default as User } from './models/User';
export { default as Comment } from './models/Comment';
