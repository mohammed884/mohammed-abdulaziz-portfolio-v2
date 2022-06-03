import Review from "../../models/review";
import nc from "next-connect";
import reviewSchema from "../../validation/review";
import dayjs from "dayjs";
import isAdmin from "../../middleware/isAdmin";
import db from "../../utilities/db";
import multerUpload from "../../middleware/multer";
import { cloudinaryMethods } from "../../utilities/cloudinaryMethods";
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
handler.post(multerUpload.single("cover"), async (req, res) => {
    try {
        //STRUCTURE AND VALIDATE DATA
        const { name, description, stars, projectLink } = req.body;

        if (projectLink && projectLink.slice(0, 8) !== "https://") return res.send({ success: false, message: "اكتب رابط بصيغة صحيحة" })
        await reviewSchema.validateAsync({ name, description, stars });
        const path = await cloudinaryMethods.single({ image: req.file });
        if (path.success !== undefined) return res.send({ success:false, message: path.message})
        //CREATE THE REVIEW
        await db.connect()

        await new Review({
            name,
            description,
            stars,
            projectLink,
            cover: path,
            date: dayjs().format("MMM D, YYYY"),
            analysis_date: dayjs().format("M/YYYY"),
        }).save();
        await db.disconnect()

        res.send({ success: true, message: "تم نشر تجربتك بنجاح" })
    } catch (err) {
        if (!err.isJoi) return res.send({ success: false, message: err.message })
        const message = err.details[0].message.replace(/"/g, "");
        res.send({ success: false, message })

    }
});
handler.delete(isAdmin, async (req, res) => {
    try {
        const _id = req.headers._id;
        const review = await Review.findOne({ _id });
        if (review.cover !== "default.png") await cloudinaryMethods.deleteUpload(review.cover.publicId)
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