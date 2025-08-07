import { Timestamp } from '@angular/fire/firestore';

export abstract class User {
  declare public readonly uid: string;
  declare public readonly email: string;
  declare public readonly username: string;
  declare public readonly role: 'user' | 'admin';
  declare public readonly photoURL?: string;

  declare public readonly createdAt: Timestamp;
  declare public readonly lastLogin: Timestamp;

  protected constructor(user: User) {
    this.uid = user.uid;
    this.email = user.email;
    this.username = user.username;
    this.photoURL = user.photoURL;
    this.role = user.role;
    this.createdAt = user.createdAt;
    this.lastLogin = user.lastLogin;
  }
}

export class UserEntity extends User {
  public static from(user: User) {
    return new UserEntity(user);
  }

  public isAdmin() {
    return this.role === 'admin';
  }
}
