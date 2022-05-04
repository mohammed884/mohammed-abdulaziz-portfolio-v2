import { verify } from 'jsonwebtoken';
const isLogin = (req, res, next) => {
    const token = req.headers.token;
    const { ADMIN_NAME, JWT_SECRET } = process.env;
    let isLogin;
    verify(token, JWT_SECRET, (err, decoded) => {
        if (err) isLogin = false
        else {
            if (decoded.username === ADMIN_NAME) isLogin = true 
            else isLogin = false
        }
    })
    if (isLogin) return res.send({ success: false, message: "You are already logged in" });
    next()
}

module.exports = isLogin