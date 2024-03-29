import jwt from "jsonwebtoken";
import dotenv from "dotenv/config.js";

function verifyToken(req, res, next) {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("Require token for this request");
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};

export default { verifyToken };
