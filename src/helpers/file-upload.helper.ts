import { Request } from 'express';

import { diskStorage } from 'multer';

export const storage = () => {
  return diskStorage({
    destination: 'uploads',
    filename: (req: Request, file: Express.Multer.File, cb) => {
      const customFileName =
        Date.now() +
        '-' +
        Math.round(Math.random() * 1e9) +
        file.filename +
        file.originalname;
      cb(null, customFileName);
    },
  });
};
