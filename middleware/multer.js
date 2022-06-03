import path from "path";
import multer from "multer";
const multerUpload = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 5242880 },
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true);
    },
});
module.exports = multerUpload