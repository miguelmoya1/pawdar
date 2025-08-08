import { inject, Injectable } from '@angular/core';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { BaseResponseDto } from '../../../../dto/base-response.dto';
import { UPLOAD_FILE_SERVICE } from '../../../../services';
import { AUTH_SERVICE } from '../../../auth';
import { CreatePetDto } from '../../dto/create-pet.dto';
import { CreatePetService } from './create-pet.service.contract';

@Injectable()
export class CreatePetServiceImpl implements CreatePetService {
  readonly #functions = inject(Functions);
  readonly #firestore = inject(Firestore);
  readonly uploadFileService = inject(UPLOAD_FILE_SERVICE);
  readonly #authService = inject(AUTH_SERVICE);

  public async create(create: CreatePetDto, file?: File) {
    const petResponse = await httpsCallable<
      CreatePetDto,
      BaseResponseDto<unknown>
    >(
      this.#functions,
      'createPet',
    )(create);

    const { data } = petResponse;

    if (!data) {
      throw new Error('Failed to create pet');
    }

    const petId = data.uid;

    if (file) {
      const uploadResponse = await this.uploadFileService.uploadPetImage(
        this.#authService.userResource.value()?.uid ?? '',
        petId,
        file,
      );

      if (!uploadResponse) {
        throw new Error('Failed to upload pet image');
      }

      const petDocRef = doc(this.#firestore, 'pets', petId);

      console.log('Updating pet document with image URL:', uploadResponse);
      const response = await updateDoc(petDocRef, {
        imagesUrl: [uploadResponse],
      });
      console.log('Pet document updated successfully:', response);
    }
  }
}
