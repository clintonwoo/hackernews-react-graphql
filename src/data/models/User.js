import * as DB from '../Database';
import cache from '../Cache';

export default class User {
  static getUser(id) {
    return cache.getUser(id) || DB.getUser(id);
  }
  static getPostsForUser(id) {
    return DB.getNewsItems()
      .filter(newsItem => newsItem.submitterId === id);
  }
  static validPassword(id, password) {
    const user = cache.getUser(id);
    if (user) return user.password === password;
    return false;
  }

  static registerUser({ id, password }) {
    if (id.length < 3 || id.length > 32) throw new Error('User ID must be between 3 and 32 characters.');
    if (password.length < 8 || password.length > 100) throw new Error('User password must be longer than 8 characters.');
    if (cache.getUser(id)) throw new Error('Username is taken.');
    const user = {
      id,
      creationTime: new Date().valueOf(),
      dateOfBirth: null,
      email: null,
      favorites: [],
      firstName: null,
      hidden: [],
      karma: 1,
      lastName: null,
      likes: [],
      password,
      posts: [],
    };
    if (cache.setUser(user.id, user)) return user;
    return undefined;
  }
}
