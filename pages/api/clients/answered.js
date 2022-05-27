import nc from 'next-connect';
import database from "../../../middleware/database";
import isAdmin from "../../../middleware/isAdmin";
import Client from "../../../models/client";

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
handler.use(isAdmin);
handler.get(async (req, res) => {
    try {
        const clients = await Client.find({ answered: true });
        
        res.send({ success: true, clients });
    } catch (err) {
        res.send({ success: false, message: err.message });
        console.log(err);
    }
});
handler.put(async (req, res) => {
    try {
        const { _id } = req.body;
        await Client.updateOne({ _id }, { $set: { "deal": true } });
        
        res.send({ success: true });
    } catch (err) {
        res.send({ success: false, message: err.message });
        console.log(err);
    }
})
export default handler