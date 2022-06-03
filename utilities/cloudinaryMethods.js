import { v2 as cloudinary } from "cloudinary";

//CONFIGURE CLOUDINARY
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const single = async ({ image, isRequired }) => {
    try {
        //CHECK IF IMAGE ARE REQUIRED
        if (!image && isRequired) return { success: false, message: "image is required" }
        //UPLOAD TO CLOUDINARY
        const result = await cloudinary.uploader.upload(image.path, {
            upload_preset: "portfolio_uploads",
            folder: "uploads",
            allowed_formats: "jpg, png, jpeg"
        })
        //RETURN THE REQUIRED CREDENTIALS
        return {url:result.secure_url,publicId:result.public_id};
    } catch (err) {
        console.log(err);
        return { success: false, message: err.message }
    }
}
const multiple = async ({ images, isRequired }) => {
    try {
        //CHECK IF IMAGE ARE REQUIRED
        if (!images && isRequired) return { success: false, message: "images are required" }
        const paths = [];
        //LOOP OVER IMAGES AND UPLOAD IT
        for (let i = 0; i < images.length; i++) {
            const img = images[i];
            const result = await cloudinary.uploader.upload(img.path, {
                upload_preset: "portfolio_uploads",
                folder: "uploads",
                allowed_formats: "jpg, png, jpeg"
            });
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
        await cloudinary.uploader.destroy(publicId);
    } catch (err) {
        console.log(err);
    }
}
export const cloudinaryMethods = { multiple, single,deleteUpload };