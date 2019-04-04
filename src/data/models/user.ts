import * as DB from '../database';
import * as HNDB from '../hn-data-api';
import { cache } from '../cache';
import { createHash, createSalt } from '../../helpers/hash-password';
import { passwordIterations } from '../../config';
import { isValidUser, isValidNewUser } from '../validation/user';

export class User {
  public readonly id;
  public readonly about;
  public readonly creationTime;
  public readonly dateOfBirth;
  public readonly email;
  public readonly firstName;
  public readonly hides;
  public readonly karma;
  public readonly lastName;
  public readonly likes;
  public readonly posts;
  public readonly hashedPassword;
  public readonly passwordSalt;

  constructor(props) {
    if (!props.id) throw new Error(`Error instantiating User, id invalid: ${props.id}`);
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

  static getUser = id => cache.getUser(id) || HNDB.fetchUser(id);

  static getPostsForUser = id => DB.getNewsItems().filter(newsItem => newsItem.submitterId === id);

  static validPassword = async (id, password) => {
    const user = cache.getUser(id);
    if (user) return (await createHash(password, user.passwordSalt, passwordIterations)) === user.hashedPassword;
    return false;
  };

  static registerUser = async user => {
    // Check if user is valid
    isValidNewUser(user);

    // Check if user already exists
    if (cache.getUser(user.id)) throw new Error('Username is taken.');

    // Go ahead and create the new user
    const passwordSalt = createSalt();
    const hashedPassword = await createHash(user.password, passwordSalt, passwordIterations);

    const newUser = new User({
      id: user.id,
      hashedPassword,
      passwordSalt,
    });

    // Store the new user
    cache.setUser(user.id, newUser);

    return newUser;
  };
}
