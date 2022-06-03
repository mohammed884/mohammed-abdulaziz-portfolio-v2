import nc from "next-connect";
import isAdmin from "../../../middleware/isAdmin"
import Project from "../../../models/project";
import projectSchema from "../../../validation/project";
import dayjs from "dayjs"
import fs from "fs";
import db from "../../../utilities/db";
import { cloudinaryMethods } from "../../../utilities/cloudinaryMethods";
import multerUpload from "../../../middleware/multer";
const handler = nc({
    attachParams: true,
    onError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
        res.status(404).end("Page is not found");
    },
});
handler.get(async (req, res) => {
    try {
        await db.connect()
        const projects = await Project.find().lean();
        await db.disconnect()
        res.send({ success: true, projects });
    } catch (err) {
        console.log(err);
        res.send({ success: false, message: err.message });
    }
});
handler.use(isAdmin)
handler.post(multerUpload.array("slider"), async (req, res) => {
    try {
        //STRUCTURE AND VALIDATE DATA
        const { arTitle, enTitle, description, link, client, duration, yearOfCreation } = req.body;
        await projectSchema.validateAsync({ arTitle, enTitle, description, duration, client });
        const paths = await cloudinaryMethods.multiple({ images: req.files, isRequired: true });
        if (paths.success !== undefined) return res.send({ success: false, message: paths.message });
        await db.connect()
        await new Project({
            arTitle,
            enTitle,
            description,
            slider: paths,
            link,
            date: {
                published: dayjs().format("MMM D, YYYY"),
                yearOfCreation
            },
            duration,
            client,
        }).save();
        await db.disconnect()
        res.send({ success: true, message: "تم نشر المشروع" })
    } catch (err) {
        if (!err.isJoi) return res.send({ success: false, message: err.message })
        const message = err.details[0].message.replace(/"/g, "");
        res.send({ success: false, message })
    }
});
handler.delete(async (req, res) => {
    try {
        const { _id } = req.headers;
        await db.connect()
        const project = await Project.findOne({ _id });
        const publicIds = project.slider.map(img => img.publicId);
        publicIds.forEach(async publicId => await cloudinaryMethods.deleteUpload(publicId))
        await project.delete();
        await db.disconnect();

        res.send({ success: true })
    } catch (err) {
        console.log(err);
        res.send({ success: false, message: err.message })
    }
})
export const config = {
    api: {
        bodyParser: false,
    }
}
export default handler;