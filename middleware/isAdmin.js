import { verify } from 'jsonwebtoken';
const isAdmin = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.token;
        const { ADMIN_PASSWORD, JWT_SECRET } = process.env;
        let isAdmin;
        verify(token, JWT_SECRET, (err, decoded) => {
            if (err) isAdmin = false
            else {
                if (decoded.password === ADMIN_PASSWORD) isAdmin = true
                else isAdmin = false
            }
        })
        if (!isAdmin) return res.send({ success: false, message: "Unauthorized" });
        next();
    } catch (err) {
        console.log(err);
    }
}
module.exports = isAdmin