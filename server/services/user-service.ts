import { passwordIterations } from '../../src/config';
import { NewsItemModel, UserModel } from '../../src/data/models';
import { validateNewUser } from '../../src/data/validation/user';
import { createHash, createSalt } from '../../src/helpers/hash-password';
import type { HnCache } from '../database/cache';
import type { HnDatabase } from '../database/database';

export class UserService {
  db: HnDatabase;
  cache: HnCache;

  constructor(db: HnDatabase, cache: HnCache) {
    this.db = db;
    this.cache = cache;
  }

  async getUser(id: string): Promise<UserModel | void> {
    return this.cache.getUser(id) || this.db.fetchUser(id);
  }

  async getPostsForUser(id: string): Promise<NewsItemModel[]> {
    return this.db.getNewsItems().filter((newsItem) => newsItem.submitterId === id);
  }

  async validatePassword(id: string, password: string): Promise<boolean> {
    const user = this.cache.getUser(id);
    if (user) {
      return (
        (await createHash(password, user.passwordSalt!, passwordIterations)) === user.hashedPassword
      );
    }

    return false;
  }

  async registerUser(user: { id: string; password: string }): Promise<UserModel> {
    // Check if user is valid
    validateNewUser(user);

    // Check if user already exists
    if (this.cache.getUser(user.id)) {
      throw new Error('Username is taken.');
    }

    // Go ahead and create the new user
    const passwordSalt = createSalt();
    const hashedPassword = await createHash(user.password, passwordSalt, passwordIterations);

    const newUser = new UserModel({
      hashedPassword,
      id: user.id,
      passwordSalt,
    });

    // Store the new user
    this.cache.setUser(user.id, newUser);

    return newUser;
  }
}
