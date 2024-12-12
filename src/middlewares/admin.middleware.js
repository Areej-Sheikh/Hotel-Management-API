const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
exports.adminMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);
    req.user = user;

  if(!req.user|| !req.user.isAdmin){
    return res.status(403).json({ message: "Unauthorized Access. Admins Only" });  // Forbidden Access for non-admin users. You can return any status code that suits your application needs. For example, 403 Forbidden.  // Forbidden Access for non-admin users. You can return any status code that suits your application needs. For example, 403 Forbidden.  // Forbidden Access for non-admin users. You can return any status code that suits your application needs. For example, 403 Forbidden.  // Forbidden Access for non-admin users. You can return any status code that suits your application needs. For example, 403 Forbidden.  // Forbidden Access for non-admin users. You can return any status code that suits your application needs. For example, 403 Forbidden.  // Forbidden Access for non-admin users.
  }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: error.message });
  }
};
