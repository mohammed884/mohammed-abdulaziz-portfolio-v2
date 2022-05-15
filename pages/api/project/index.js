import nc from "next-connect";
import isAdmin from "../../../middleware/isAdmin"
import database from "../../../middleware/database"
import Project from "../../../models/project";
import multer from "multer";
import { nanoid } from "nanoid";
import projectSchema from "../../../validation/project";
import dayjs from "dayjs"
import fs from "fs";
const upload = multer({
    limits: { fileSize: 5242880 },
    storage: multer.diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => cb(null, `${nanoid()}-${file.originalname}`),
    }),
});
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
handler.use(database)
handler.get(async (req, res) => {
    try {
        const projects = await Project.find().lean();
        res.send({ success: true, projects });
    } catch (err) {
        console.log(err);
        res.send({ success: false, message: err.message });
    }
});
handler.use(isAdmin)
handler.post(upload.array("slider", 5), async (req, res) => {
    try {
        //STRUCTURE AND VALIDATE DATA
        const { arTitle, enTitle, description, link, client, duration, yearOfCreation } = req.body;
        const mimetypes = ["image/png", "image/jpeg", "image/jpg"];
        var fileNames = req.files.map(img => {
            if (!mimetypes.includes(img.mimetype)) return res.send({ success: false, message: "حمل الصور بصيغة صحيحة" });
            else return img.filename
        });

        await projectSchema.validateAsync({ arTitle, enTitle, description, slider: fileNames, duration, client });

        //CREATE THE NEW PROJECT
        await new Project({
            arTitle,
            enTitle,
            description,
            slider: fileNames,
            link,
            date: {
                published: dayjs().format("MMM D, YYYY"),
                yearOfCreation
            },
            duration,
            client,
        }).save();
        res.send({ success: true, message: "تم نشر المشروع" })
    } catch (err) {
        //REMOVE UPLOADED FILES
        fileNames.forEach(fileName => {
            fs.unlinkSync(`./public/uploads/${fileName}`)
        })
        if (!err.isJoi) return res.send({ success: false, message: err.message })
        const message = err.details[0].message.replace(/"/g, "");
        res.send({ success: false, message })
    }
});
handler.delete(async (req, res) => {
    try {
        const { _id } = req.headers;
        const project = await Project.findOne({ _id});
        project.slider.forEach(img => fs.unlinkSync(`./public/uploads/${img}`))
        await project.delete()
        res.send({ success: true })
    } catch (err) {
        console.log(err);
        res.send({ success: false, message: err.message })
    }
})
export const config = {
    api: {
        bodyParser: false,
    },
};
export default handler;