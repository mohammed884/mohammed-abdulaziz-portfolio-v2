import { v2 as cloudinary } from "cloudinary";

const single = async (image) => {
    try {
        //CHECK IF IMAGE ARE REQUIRED
        if (!image) return { success: false, message: "image is required" };
        //CONFIGURE CLOUDINARY
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        //UPLOAD TO CLOUDINARY
        const result = await cloudinary.uploader.upload(image.path, {
            upload_preset: "portfolio_uploads",
            folder: "uploads",
            allowed_formats: "jpg, png, jpeg"
        })
        //RETURN THE REQUIRED CREDENTIALS
        return { url: result.secure_url, publicId: result.public_id };
    } catch (err) {
        console.log(err);
        return { success: false, message: err.message }
    }
}
const multiple = async (images) => {
    try {
        //CHECK IF IMAGE ARE REQUIRED
        if (!images) return { success: false, message: "images are required" }
        const paths = [];
        //CONFIGURE CLOUDINARY
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        //LOOP OVER IMAGES AND UPLOAD IT
        for (let i = 0; i < images.length; i++) {
            const img = images[i];
            const result = await cloudinary.uploader.upload(img.path, {
                upload_preset: "portfolio_uploads",
                folder: "uploads",
                allowed_formats: "jpg, png, jpeg"
            });
            console.log(img);
            paths.push({ url: result.secure_url, publicId: result.public_id });
        }
        //RETURN THE REQUIRED CREDENTIALS
        return paths;
    } catch (err) {
        console.log(err);
        return { success: false, message: err.message }
    }
};
const deleteUpload = async (publicId) => {
    try {
        //CONFIGURE CLOUDINARY
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        await cloudinary.uploader.destroy(publicId);
    } catch (err) {
        console.log(err);
    }
}
export const cloudinaryMethods = { multiple, single, deleteUpload };