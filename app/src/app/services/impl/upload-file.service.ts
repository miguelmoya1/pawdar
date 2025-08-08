import { inject, Injectable } from '@angular/core';
import {
  deleteObject,
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { UploadFileService } from './upload-file.service.contract';

@Injectable({ providedIn: 'root' })
export class UploadFileServiceImpl implements UploadFileService {
  readonly #storage = inject(Storage);

  async uploadPetImage(
    userId: string,
    petId: string,
    file: File,
    oldImageUrl?: string,
  ) {
    if (oldImageUrl) {
      try {
        const oldRef = ref(this.#storage, oldImageUrl);
        await deleteObject(oldRef);
      } catch (e) {}
    }

    const filePath = `/users/${userId}/pets/${petId}/images/${Date.now()}_${file.name}`;
    const storageRef = ref(this.#storage, filePath);

    await uploadBytes(storageRef, file);

    return await getDownloadURL(storageRef);
  }
}
