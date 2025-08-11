import { inject, Injectable } from '@angular/core';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { UPLOAD_FILE_SERVICE } from '../../../../services';
import { UpdatePetDto } from '../../dto/update-pet.dto';
import { UpdatePetService } from './update-pet.service.contract';

@Injectable({
  providedIn: 'root',
})
export class UpdatePetServiceImpl implements UpdatePetService {
  readonly #firestore = inject(Firestore);
  readonly uploadFileService = inject(UPLOAD_FILE_SERVICE);

  async update(petId: string, petData: UpdatePetDto, file?: File) {
    const petDocRef = doc(this.#firestore, 'pets', petId);

    if (file) {
      const uploadResponse = await this.uploadFileService.uploadPetImage(
        petData.ownerId ?? '',
        petId,
        file,
      );

      if (!uploadResponse) {
        throw new Error('Failed to upload pet image');
      }

      return await updateDoc(petDocRef, {
        ...petData,
        imagesUrl: [uploadResponse],
      });
    }

    return await updateDoc(petDocRef, {
      ...petData,
    });
  }

  async markAsMissing(petId: string): Promise<void> {
    const petDocRef = doc(this.#firestore, 'pets', petId);
    await updateDoc(petDocRef, {
      status: 'missing',
    });
  }

  async markAsSafe(petId: string): Promise<void> {
    const petDocRef = doc(this.#firestore, 'pets', petId);
    await updateDoc(petDocRef, {
      status: 'safe',
    });
  }
}
