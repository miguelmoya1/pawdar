import { firestore } from "firebase-admin";

export interface User {
  readonly uid: string;
  readonly email: string;
  readonly username: string;
  readonly role: "user" | "admin";
  readonly createdAt: firestore.Timestamp;
  readonly lastLogin?: firestore.Timestamp;
}
