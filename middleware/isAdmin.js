import { verify } from 'jsonwebtoken';
const isAdmin = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const { ADMIN_NAME, JWT_SECRET } = process.env;
        let isAdmin;
        verify(token, JWT_SECRET, (err, decoded) => {
            if (err) isAdmin = false
            else {
                if (decoded.username === ADMIN_NAME) isAdmin = true
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