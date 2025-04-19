const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (tokenDecoded.email !== process.env.ADMIN_EMAIL) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: error.message });
  }
};

module.exports = adminAuth;
