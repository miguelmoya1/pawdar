import { User } from "../../../domain";
import { db } from "../db";

export type CreateUserParams = Partial<User> & { uid: string } & Pick<
    User,
    "email" | "username" | "role"
  >;

const create = async (user: CreateUserParams) => {
  try {
    return await db.collection("users").doc(user.uid).set(user);
  } catch (error) {
    return null;
  }
};

const getById = async (uid: string): Promise<User | null> => {
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

const update = async (uid: string, data: Partial<User>) => {
  try {
    return await db.collection("users").doc(uid).update(data);
  } catch (error) {
    return null;
  }
};

const userRepository = {
  create,
  getById,
  update,
};

export { userRepository };
