import { Pet } from "../../../domain/entities";
import { PetMapper } from "../../../domain/mappers";
import { db } from "../db";

export type CreatePetParams = Partial<Pet> &
  Pick<
    Pet,
    "ownerId" | "name" | "type" | "imagesUrl" | "description" | "status"
  >;

const create = async (pet: CreatePetParams) => {
  try {
    const collection = db.collection("pets");

    const createdDoc = await collection.add(pet);

    const docRef = await collection.doc(createdDoc.id).get();

    if (!docRef.exists) {
      return null;
    }

    return PetMapper.toEntity(docRef.data());
  } catch (error) {
    return null;
  }
};

const getById = async (uid: string): Promise<Pet | null> => {
  try {
    const doc = await db.collection("pets").doc(uid).get();
    if (!doc.exists) {
      return null;
    }
    return PetMapper.toEntity(doc.data());
  } catch (error) {
    return null;
  }
};

const petRepository = {
  create,
  getById,
};

export { petRepository };
