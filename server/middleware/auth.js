import jsonwebtoken from "jsonwebtoken";
import config from "config";

const auth = function (req, res, next) {
  // Get the token from header

  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify Token
  try {
    const decoded = jsonwebtoken.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default auth;
