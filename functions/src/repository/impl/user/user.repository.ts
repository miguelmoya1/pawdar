import { User } from "../../../domain";
import { db } from "../db";

export type CreateUserParams = Partial<User> & { uid: string };

export const createUser = async (user: CreateUserParams) => {
  try {
    return await db.collection("users").doc(user.uid).set(user);
  } catch (error) {
    return null;
  }
};

export const getById = async (uid: string): Promise<User | null> => {
  try {
    const doc = await db.collection("users").doc(uid).get();
    if (!doc.exists) {
      return null;
    }
    return doc.data() as User;
  } catch (error) {
    return null;
  }
};

export const update = async (uid: string, data: Partial<User>) => {
  try {
    return await db.collection("users").doc(uid).update(data);
  } catch (error) {
    return null;
  }
};
