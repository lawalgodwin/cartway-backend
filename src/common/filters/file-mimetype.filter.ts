import { UnsupportedMediaTypeException } from '@nestjs/common';

export function fileMimetypeFilter(...mimetypes: string[]) {
  return (
    req,
    file: Express.Multer.File,
    callback: (err: Error | null, acceptFile: boolean) => void,
  ) => {
    if (mimetypes.some((mimetype) => file.mimetype.includes(mimetype))) {
      callback(null, true);
    } else {
      callback(
        new UnsupportedMediaTypeException(
          `File type is not matching ${mimetypes.join(', ')}`,
        ),
        false,
      );
    }
  };
}
