import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiFile,
  ApiFileFields,
  ApiFiles,
  ApiImageFile,
  ApiPdfFile,
  fileMimetypeFilter,
  ParseFile,
} from 'src/common';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  /**
   * Upload a single file under the field name: 'file'
   * @param receipt the uploaded receipt will be stored in-memory accessed by this variable
   */
  @Post('upload')
  @ApiImageFile()
  async uploadReceipt(@UploadedFile(ParseFile) receipt: Express.Multer.File) {
    console.log('uploaded receipt', receipt);
  }

  /**
   * Upload multiple files under the same field name: 'files'
   * @param dishes all files uploaded is stored in-memory accessed by this variable
   */
  @Post('uploads')
  @ApiFiles('files', true)
  async uploadFiles(@UploadedFiles(ParseFile) dishes: Express.Multer.File[]) {
    console.log('uploaded files', dishes);
  }

  /**
   * Upload multiple files with their individual field names: 'avarta', 'background'
   * @param dishes all uploaded files are stored in-memory accessed by this variable
   */
  @Post('uploadFields')
  @ApiFileFields([
    { name: 'avatar', maxCount: 1, required: true },
    { name: 'background', maxCount: 1 },
  ])
  async uploadMultipleFiles(
    @UploadedFiles(ParseFile) dishes: Express.Multer.File[],
  ) {
    console.log('uploaded files', dishes);
  }

  @Post('document')
  @ApiPdfFile()
  uploadDocument(@UploadedFile(ParseFile) document: Express.Multer.File) {}
}
