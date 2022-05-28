import Review from "../../models/review";
import multer from "multer";
import nc from "next-connect";
import { nanoid } from 'nanoid';
import reviewSchema from "../../validation/review";
import dayjs from "dayjs";
import isAdmin from "../../middleware/isAdmin";
import db from "../../utilities/db";
import fs from "fs"
const upload = multer({
    limits: { fileSize: 5242880 },
    storage: multer.diskStorage({
        destination: '/tmp/uploads',
        filename: (req, file, cb) => cb(null, `${nanoid()}-${file.originalname}`),
    }),
});
const handler = nc({
    onError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
        res.status(404).end("Page is not found");
    },
})
handler.get(async (req, res) => {
    try {
        // SEND ALL REVIEWS
        await db.connect()

        const reviews = await Review.find().lean();

        await db.disconnect()

        res.send(reviews);
    } catch (err) {
        console.log(err);
        res.send("error")
    }
})
handler.post(upload.single("cover"), async (req, res) => {
    try {
        //STRUCTURE AND VALIDATE DATA
        const { name, description, stars, projectLink } = req.body;
        if (req.file) {
            var fileName = req.file.filename;
            var mimetype = req.file.mimetype;
        }
        if (projectLink && projectLink.slice(0, 8) !== "https://") return res.send({ success: false, message: "اكتب رابط بصيغة صحيحة" })
        await reviewSchema.validateAsync({ name, description, stars, mimetype });

        //CREATE THE REVIEW
        await db.connect()

        await new Review({
            name,
            description,
            stars,
            projectLink,
            cover: fileName,
            date: dayjs().format("MMM D, YYYY"),
            analysis_date: dayjs().format("M/YYYY"),
        }).save();
        await db.disconnect()

        res.send({ success: true, message: "تم نشر تجربتك بنجاح" })
    } catch (err) {
        //REMOVE UPLOADED FILE
        if (fileName) {
            fs.unlinkSync(`./public/uploads/${fileName}`)
        }
        if (!err.isJoi) return res.send({ success: false, message: err.message })
        const message = err.details[0].message.replace(/"/g, "");
        res.send({ success: false, message })

    }
});
handler.delete(isAdmin, async (req, res) => {
    try {
        const _id = req.headers._id;
        const review = await Review.findOne({ _id });
        if (review.cover !== "default.png") fs.unlinkSync(`./public/uploads/${review.cover}`);
        await db.connect()

        await review.delete();

        await db.disconnect()

        res.send({ success: true })
    } catch (err) {
        console.log(err);
        res.send({ success: false, message: err.message })
    }
});
export const config = {
    api: {
        bodyParser: false,
    },
};
export default handler;