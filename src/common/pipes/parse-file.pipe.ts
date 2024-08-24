import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

/**
 * The pipe will check if the file is provided or not and throw a 400 Bad Request exception
 */
@Injectable()
export class ParseFile implements PipeTransform {
  transform(
    files: Express.Multer.File | Express.Multer.File[],
    _metadata: ArgumentMetadata,
  ): Express.Multer.File | Express.Multer.File[] {
    if (files === undefined || files === null) {
      throw new BadRequestException('Validation failed: (file expected)');
    }
    if (Array.isArray(files) && files.length === 0) {
      throw new BadRequestException('Validation failed: (files expected)');
    }

    return files;
  }
}
