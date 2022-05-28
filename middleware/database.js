import db from "../utilities/db"
const connect = async (req, res, next) => {
    try {
        await db.connect();
        next()
    } catch (err) {
        console.log(err);
    }
}
module.exports = connect