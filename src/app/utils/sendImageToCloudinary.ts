import { v2 as cloudinary } from 'cloudinary';
import config from '../config/index';
import multer from 'multer';
import fs from 'fs';

export const sendImageToCloudinary = async (
  image: string,
  publicId: string,
) => {
  // Configuration
  cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret_key, // Click 'View Credentials' below to copy your API secret
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(image, {
      public_id: publicId,
    })
    .catch((error) => {
      console.log(error);
    });

  // delete a file asynchronously

  fs.unlink(image, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('file is deleted');
    }
  });

  // console.log(uploadResult);

  return uploadResult;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
