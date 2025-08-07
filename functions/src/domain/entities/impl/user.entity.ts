import { firestore } from "firebase-admin";

export abstract class User {
  readonly email: string;
  readonly username: string;
  readonly role: "user" | "admin";
  readonly createdAt: firestore.Timestamp;
  readonly lastLogin?: firestore.Timestamp;

  protected constructor(user: User) {
    this.email = user.email;
    this.username = user.username;
    this.role = user.role;
    this.createdAt = user.createdAt;
    this.lastLogin = user.lastLogin;
  }
}

export class UserEntity extends User {
  public static create(user: User) {
    return new UserEntity(user);
  }

  isAdmin() {
    return this.role === "admin";
  }
}
