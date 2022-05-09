import nc from 'next-connect';
import database from "../../middleware/database";
import isAdmin from "../../middleware/isAdmin";
import PotentialClient from "../../models/potentialClient"
const handler = nc({
    onError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
        res.status(404).end("Page is not found");
    },
});
handler.use(database);
handler.get(isAdmin, async (req, res) => {
    try {
        const potentialClients = await PotentialClient.find({});
        res.send({ success: true, potentialClients });
    } catch (err) {
        res.send({ success: false, message:err.message });
        console.log(err);
    }
});

export default handler