import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export type UploadFields = MulterField & { required?: boolean };
