import { storage } from 'src/helpers';
import { fileMimetypeFilter } from '../filters';
import { ApiFile } from './api-file.decorator';

export function ApiImageFile(
  fileName: string = 'image',
  required: boolean = false,
) {
  return ApiFile(fileName, required, {
    fileFilter: fileMimetypeFilter('image'),
    storage: storage(),
  });
}

export function ApiPdfFile(
  fileName: string = 'document',
  required: boolean = false,
) {
  return ApiFile(fileName, required, { fileFilter: fileMimetypeFilter('pdf') });
}
