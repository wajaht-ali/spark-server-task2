export const verifyToken = (req, res, next) => {
  const token = req.headers["Authorization"];
  if (!token) {
    return res.status(403).json({ message: "No token provided." });
  }
  // if it's a baerer token
  const tokenWithoutBearer = token.startsWith("Bearer ")
    ? token.slice(7)
    : token;
  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "Failed to authenticate token." });
    }
    req.userId = decoded.id;
    req.userEmail = decoded.email;

    next();
  });
};
