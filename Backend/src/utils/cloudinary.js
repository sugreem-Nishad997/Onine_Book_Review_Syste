import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary'
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import multer  from 'multer';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
}) 

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"books",
        allowed_formats: ["jpg","jpeg","png"]
    }
})

const upload = multer({storage});
console.log('inside the cloudinary')

export {cloudinary, upload};