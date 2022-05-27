import dbConnect from "../utilities/db"
const connect = async (req, res, next) => {
    try {
        await dbConnect();
        next()
    } catch (err) {
        console.log(err);
    }
}
module.exports = connect