import nc from "next-connect";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken"
import isLogin from "../../middleware/isLogin";
const handler = nc({
    onError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
        res.status(404).end("Page is not found");
    },
});
handler.post(isLogin, async (req, res) => {
    //STRUCTURE AND VALIDATE DATA
    const { name, password } = req.body;
    const { JWT_SECRET, ADMIN_NAME, ADMIN_PASSWORD, NODE_ENV } = process.env;
    if (name !== ADMIN_NAME || password !== ADMIN_PASSWORD) return res.send({ success: false, message: "الاسم و الباسورد لا يتطابقان" })
    //A SIGN A TOKEN
    const token = sign({
        password: ADMIN_PASSWORD,
        exp: (Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30) * 5,
    }, JWT_SECRET);

    //CREATE THE TOKEN
    res.setHeader('Set-Cookie', serialize('token', token, {
        httpOnly: true,
        sameSite:"strict",
        maxAge: 24 * 60 * 60 * 30 * 5,
        secure: NODE_ENV === "production",
        path: "/",
    }));
    res.send({ success: true })
})
export default handler;