import jwt from "jsonwebtoken";


const authMiddleWare = async (req, res, next) => {
    const { token } = req.headers;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
        });
    }
}
export default authMiddleWare;