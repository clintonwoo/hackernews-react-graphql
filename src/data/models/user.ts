import { passwordIterations } from '../../config';
import { createHash, createSalt } from '../../helpers/hash-password';
import { cache } from '../cache';
import * as DB from '../database';
import * as HNDB from '../hn-data-api';
import { isValidNewUser, isValidUser } from '../validation/user';

export class User {
  public readonly id: string;

  public readonly about: string;

  public readonly creationTime;

  public readonly dateOfBirth;

  public readonly email: string;

  public readonly firstName: string;

  public readonly hides;

  public readonly karma: number;

  public readonly lastName: string;

  public readonly likes;

  public readonly posts;

  public readonly hashedPassword: string;

  public readonly passwordSalt: string;

  constructor(props) {
    if (!props.id) {
      throw new Error(`Error instantiating User, id invalid: ${props.id}`);
    }
    isValidUser(props);

    this.id = props.id;
    this.about = props.about || '';
    this.creationTime = props.creationTime || +new Date();
    this.dateOfBirth = props.dateOfBirth || null;
    this.email = props.email || null;
    this.firstName = props.firstName || null;
    this.hides = props.hides || [];
    this.karma = props.karma || 1;
    this.lastName = props.lastName || null;
    this.likes = props.likes || [];
    this.posts = props.posts || [];
    this.hashedPassword = props.hashedPassword || undefined;
    this.passwordSalt = props.passwordSalt || undefined;
  }

  static getUser = (id: string) => cache.getUser(id) || HNDB.fetchUser(id);

  static getPostsForUser = (id: string) => DB.getNewsItems().filter((newsItem) => newsItem.submitterId === id);

  static validPassword = async (id: string, password: string) => {
    const user = cache.getUser(id);
    if (user) {
      return (await createHash(password, user.passwordSalt, passwordIterations)) === user.hashedPassword;
    }

    return false;
  };

  static registerUser = async (user: { id: string; password: string }) => {
    // Check if user is valid
    isValidNewUser(user);

    // Check if user already exists
    if (cache.getUser(user.id)) {
      throw new Error('Username is taken.');
    }

    // Go ahead and create the new user
    const passwordSalt = createSalt();
    const hashedPassword = await createHash(user.password, passwordSalt, passwordIterations);

    const newUser = new User({
      hashedPassword,
      id: user.id,
      passwordSalt,
    });

    // Store the new user
    cache.setUser(user.id, newUser);

    return newUser;
  };
}
