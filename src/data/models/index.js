
/*
  Models are like data controllers
  They interact with the Cache and DB
*/

// GraphQL supports promises so models can return them

export { default as Feed } from './Feed';
export { default as NewsItem } from './NewsItem';
export { default as User } from './User';
export { default as Comment } from './Comment';
