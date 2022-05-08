import nc from "next-connect";
import isAdmin from "../../middleware/isAdmin"
const handler = nc({
    onError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
        res.status(404).end("Page is not found");
    },
});
handler.get(isAdmin, async (req, res) => {
    try {
        res.send({success: true});
    } catch (err) {
        res.send({success: false});
        console.log(err);
    }
});

export default handler