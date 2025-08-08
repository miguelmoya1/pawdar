import { UploadFileServiceImpl } from './upload-file.service';
import { UploadFileService } from './upload-file.service.contract';

describe('UploadFileServiceImpl', () => {
  let service: UploadFileService;

  beforeEach(() => {
    service = new UploadFileServiceImpl();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
