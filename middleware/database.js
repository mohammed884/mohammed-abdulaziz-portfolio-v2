import dbConnect from "../utilities/dbConnect"
const connect = async (req, res, next) => {
    try {
        await dbConnect();
        next()
    } catch (err) {
        console.log(err);
    }
}
module.exports = connect