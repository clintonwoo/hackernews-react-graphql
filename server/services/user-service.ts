import { passwordIterations } from '../config';
import { createHash, createSalt } from '../../src/helpers/hash-password';
import { cache } from '../database/cache';
import * as DB from '../database/database';
import * as HNDB from '../database/hn-data-api';
import { isValidNewUser } from '../../src/data/validation/user';
import { UserModel, NewsItemModel } from '../../src/data/models';

export class UserService {
  static getUser(id: string): UserModel | Promise<UserModel | void> {
    return cache.getUser(id) || HNDB.fetchUser(id);
  }

  static getPostsForUser(id: string): NewsItemModel[] {
    return DB.getNewsItems().filter((newsItem) => newsItem.submitterId === id);
  }

  static async validatePassword(id: string, password: string): Promise<boolean> {
    const user = cache.getUser(id);
    if (user) {
      return (
        (await createHash(password, user.passwordSalt!, passwordIterations)) === user.hashedPassword
      );
    }

    return false;
  }

  static async registerUser(user: { id: string; password: string }): Promise<UserModel> {
    // Check if user is valid
    isValidNewUser(user);

    // Check if user already exists
    if (cache.getUser(user.id)) {
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
    cache.setUser(user.id, newUser);

    return newUser;
  }
}
