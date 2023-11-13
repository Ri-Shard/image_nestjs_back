import { Injectable } from '@nestjs/common';

import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({ 
        cloud_name: 'dildphprm', 
        api_key: '662578172595695', 
        api_secret: "YK17JlJ9MM6nxexu6iy2KxwYW6o" 
      });
  },
};

