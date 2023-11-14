import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  Request
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { FilesInterceptor,FileInterceptor } from '@nestjs/platform-express';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('image')
export class AppController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const uploadedFile = await this.cloudinaryService.uploadFile(file);

    return uploadedFile.url;
  }

  @Post('uploads')
 @UseInterceptors(FilesInterceptor('files'))
 async uploadFile(@UploadedFiles() files): Promise<any> {
    const response = [];
    for (const file of files) {
      const result = await this.cloudinaryService.uploadFile(file);
      response.push(result.url);
    }
    return response;
 }
}
