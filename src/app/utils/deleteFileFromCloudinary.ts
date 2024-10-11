import { cloudinaryConfig } from "../config/cloudinary.config";


export const deleteFileFromCloudinary = async(url:string) => {
    const public_id=`ttt-zone/${url.split('/').slice(-1)[0].split('.')[0]}` ;
    await cloudinaryConfig.uploader.destroy(public_id);
    return 
}

