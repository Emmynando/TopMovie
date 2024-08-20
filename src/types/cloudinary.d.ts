// src/types/cloudinary.d.ts
declare module 'cloudinary' {
    export const v2: {
      utils: {
        api_sign_request(paramsToSign: any, apiSecret: string): string;
      };
    };
  }
  