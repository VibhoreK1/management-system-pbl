const jwt = require("jsonwebtoken");

const SECRET_KEY = "SecuredKey123";

function authenticateToken(req, res, next) {

  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided."
    });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {

    if (err) {
      return res.status(403).json({
        message: "Invalid token"
      });
    }
    console.log("user",user);

    req.user = user;

    next();
  });
}

module.exports = authenticateToken;