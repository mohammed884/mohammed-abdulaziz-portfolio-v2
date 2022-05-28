import nc from "next-connect";
import Project from "../../../models/project";
import db from "../../../utilities/db";
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
        const title = req.headers.title;
        await db.connect()
        const project = await Project.findOne({ title });
        if (!project) return res.send({ success: false, message: "Invalid Title" })
        await db.disconnect()

        res.send({ success: true, project });
    } catch (err) {
        console.log(err);
        res.send({ success: false, message: err.message });
    }
});
export default handler;
