import { validateUsername } from '../validation/user';

export class UserModel {
  public readonly id: string;

  public readonly about: string;

  public readonly creationTime: number;

  public readonly dateOfBirth: number | null;

  public readonly email: string | null;

  public readonly firstName: string | null;

  public readonly hides;

  public readonly karma: number;

  public readonly lastName: string | null;

  public readonly likes;

  public readonly posts;

  public readonly hashedPassword: string | undefined;

  public readonly passwordSalt: string | undefined;

  constructor(props) {
    if (!props.id) {
      throw new Error(`Error instantiating User, id invalid: ${props.id}`);
    }

    validateUsername(props);

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
}
