import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import fs from 'fs';

@Injectable()
export class CloudinaryService {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }

    async uploadOnCloudinary(localFilePath: string): Promise<any> {
        try {
            if (!localFilePath) return null;

            const uploadResponse: UploadApiResponse = await cloudinary.uploader.upload(localFilePath, {
                resource_type: 'auto',
            });

            console.log('File uploaded on cloud:', uploadResponse.url);

            return uploadResponse;
        } catch (error) {
            // Remove locally saved temp file as upload fails
            fs.unlinkSync(localFilePath);
            console.error('Upload failed, file removed from local server', error);

            return null;
        }
    }
    async deleteFromCloudinary(secure_url: string): Promise<any> {
        console.log("delete from cloud secure url= ", secure_url);
        try {
            if (!secure_url) return null;
            const match: RegExpMatchArray = secure_url.match(/\/([^\/]+)\.(?:png|jpg|jpeg|gif|bmp|webp|tiff)$/i);
            let public_id: string;
            if (match && match[1]) {
                public_id = match[1];
            }
            // console.log("-----------------------------PUBLIC ID-------- ", public_id);
            const result = await cloudinary.uploader.destroy(public_id);
            if (!result) {
                console.error('Failed to delete file from cloudinary:', secure_url);
            }
            console.log(result);
            return result;
            // cloudinary.v2.api
            // .delete_resources(['wvcz9dl9a7bomwuzv2pr'],
            //   { type: 'upload', resource_type: 'image' })
            // .then(console.log);
        } catch (error) {
            console.error('Error deleting file from cloud', error);
        }
    }
}
