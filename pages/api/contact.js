import nc from "next-connect";
import contactSchema from "../../validation/contact";
import PotentialClient from "../../models/potentialClient";
import dayjs from "dayjs";
import database from "../../middleware/database"

//SETUP HANDLER
const handler = nc({
    onError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
        res.status(404).end("Page is not found");
    },
});
//CONNECT DB
handler.use(database)
handler.post(async (req, res) => {
    try {
        //STRUCTURE AND VALIDATE DATA
        const { name, email, description, socialLink, } = req.body;
        await contactSchema.validateAsync({ name, email, description, socialLink, });

        //CREATE A NEW Potential Client
        await new PotentialClient({
            name,
            email,
            project_description: description,
            socialLink,
            date: dayjs().format("MMM D, YYYY"),
            analysis_date: dayjs().format("M/YYYY"),
        }).save();
        res.send({ success: true, message: "تم ارسال رسالتك بنجاح سوف اقوم بمراسلتك في اقرب وقت ممكن" })
    } catch (err) {
        console.log(err);
        //CHECK FOR ERROS
        if (err.isJoi) {
            const message = err.details[0].message.replace(/"/g, "");
            res.send({ success: false, message });
        } else res.send({ success: false, message: err.message });
    }

});

export default handler;