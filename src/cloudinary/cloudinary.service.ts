// import { Injectable } from '@nestjs/common';
// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryResponse } from './cloudinary-response';

// const streamifier = require('streamifier');

// @Injectable()
// export class CloudinaryService {

//   uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
//     return new Promise<CloudinaryResponse>((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         (error, result) => {
//           if (error) return reject(error);
//           resolve(result);
//         },
//       );

//       streamifier.createReadStream(file.buffer).pipe(uploadStream);
//     });
//   }

//   async uploadMultipleFiles(files: Array<Express.Multer.File>): Promise<string[]> {
//     const uploads = files.map(file => {
//       return this.cloudinary.upload(file.path, {
//         public_id: `file_${Date.now()}`,
//         format: 'jpg',
//       });
//     });

//     return await Promise.all(uploads);
//  }
// }
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

 async uploadMultipleFiles(files: Express.Multer.File[]): Promise<string[]> {
  const uploads = files.map(file => {
     return cloudinary.uploader.upload(file.path, {
       public_id: `file_${Date.now()}`,
       format: 'jpg',
     });
  });
 
  return await Promise.all(uploads).then(responses => responses.map(response => response.public_id));
 }
}
