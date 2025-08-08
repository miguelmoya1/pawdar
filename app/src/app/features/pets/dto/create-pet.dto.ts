import { PET_TYPE } from '../../../constants/pet_type';

export type CreatePetDto = {
  readonly ownerId?: string;

  readonly name: string;
  readonly type: PET_TYPE;
  readonly description: string;
};
