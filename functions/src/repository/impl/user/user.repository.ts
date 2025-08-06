import { User } from "../../../domain/entities";
import { UserMapper } from "../../../domain/mappers";
import { db } from "../db";

export type CreateUserParams = Partial<User> & { uid: string } & Pick<
    User,
    "email" | "username" | "role"
  >;

const create = async (user: CreateUserParams) => {
  try {
    const collection = db.collection("users");

    const docRef = await collection.doc(user.uid).get();

    if (docRef.exists) {
      return UserMapper.toEntity(docRef.data());
    }

    await collection.doc(user.uid).set(user, { merge: true });

    const doc = await collection.doc(user.uid).get();

    if (!doc.exists) {
      return null;
    }

    return UserMapper.toEntity(doc.data());
  } catch (error) {
    console.error("Error creating user:", error);
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

const update = async (uid: string, data: Partial<User>) => {
  try {
    const docRef = await db.collection("users").doc(uid).get();

    if (!docRef.exists) {
      return null;
    }

    await docRef.ref.set(data, { merge: true });

    return UserMapper.toEntity({ ...docRef.data(), ...data });
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
