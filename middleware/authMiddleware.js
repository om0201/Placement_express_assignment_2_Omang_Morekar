const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    let token = authHeader.split(" ")[1];

    console.log(token);

    const decoded = jwt.verify(token, "SECRETKEY");

    if (decoded) {
      const username = decoded.username;

      const persistedUser = users.find((user) => user.username == username);

      if (persistedUser) {
        next();
      } else {
        // user does not exist
        res.json({ success: false, message: "User does not exist" });
      }
    } else {
      // what if decoded fails
      res.status(401).json({ message: "No authorization headers found" });
    }
  } else {
    // no authentication headers
    res.status(401).json({ message: "No authorization headers found" });
  }
}

module.exports = authenticate;
