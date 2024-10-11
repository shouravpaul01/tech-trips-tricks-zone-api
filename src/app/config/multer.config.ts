
import  { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinaryConfig } from './cloudinary.config';
const express = require('express');
const multer = require('multer');
 
const app = express();
 
const storage = new CloudinaryStorage({
  cloudinary: cloudinaryConfig,
  params: {
    folder: 'ttt-zone',
  } as any,
});
 
export const upload = multer({ storage: storage });