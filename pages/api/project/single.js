import nc from "next-connect";
import Project from "../../../models/project";
import database from "../../../middleware/database";
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
        const title = req.headers.title;
        const project = await Project.findOne({title});
        res.send({ success: true, project });
    } catch (err) {
        console.log(err);
        res.send({ success: false, message: err.message });
    }
});
export default handler;
