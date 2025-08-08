import { User } from "../../../domain/entities";
import { UserMapper } from "../../../domain/mappers";
import { db } from "../db";

export type CreateUserParams = Partial<User> &
  Pick<User, "email" | "username" | "role">;

const upset = async (user: CreateUserParams, uid: string) => {
  try {
    const collection = db.collection("users");

    await collection.doc(uid).set(user, { merge: true });

    const doc = await collection.doc(uid).get();

    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      data: UserMapper.toEntity(doc.data()),
    };
  } catch (error) {
    return null;
  }
};

const getById = async (uid: string) => {
  try {
    const doc = await db.collection("users").doc(uid).get();

    if (!doc.exists) {
      return null;
    }
    return UserMapper.toEntity(doc.data());
  } catch (error) {
    return null;
  }
};

const userRepository = {
  upset,
  getById,
};

export { userRepository };
