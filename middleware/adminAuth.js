const jwt = require("jsonwebtoken");
const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (tokenDecoded.email !== process.env.ADMIN_EMAIL) {
      return res
        .status(401)
        .json({ success: false, message: "not authorized" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: error.message });
  }
};

module.exports = adminAuth;
