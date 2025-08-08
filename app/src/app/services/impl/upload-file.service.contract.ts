import { InjectionToken } from '@angular/core';
import { UploadFileServiceImpl } from './upload-file.service';

export interface UploadFileService {
  uploadPetImage(
    userId: string,
    petId: string,
    file: File,
    oldImageUrl?: string,
  ): Promise<string>;
}

export const UPLOAD_FILE_SERVICE = new InjectionToken<UploadFileService>(
  'UPLOAD_FILE_SERVICE',
  {
    providedIn: 'root',
    factory: () => new UploadFileServiceImpl(),
  },
);
