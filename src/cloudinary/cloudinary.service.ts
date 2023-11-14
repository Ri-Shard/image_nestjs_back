
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';

const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {

 uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
 }

//  async uploadMultipleFiles(files: Express.Multer.File[]): Promise<string[]> {
//   const uploads = files.map(file => {
//      return cloudinary.uploader.upload(file.path, {
//        public_id: `file_${Date.now()}`,
//        format: 'jpg',
//      });
//   });
 
//   return await Promise.all(uploads).then(responses => responses.map(response => response.public_id));
//  }
// async uploadMultipleFiles(files: Array<Express.Multer.File>): Promise<string[]> {
//   const uploads = files.map(async file => {
//     const dataURL = await file.buffer.toString('base64');
//     return cloudinary.uploader.upload(dataURL, {
//       public_id: `file_${Date.now()}`,
//       format: 'jpg',
//     });
//   });

//   return Promise.all(uploads).then(results => results.map(result => result.url));
// }
async upload(file: Express.Multer.File): Promise<any> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.path, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}
}
