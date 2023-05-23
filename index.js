const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { urlencoded } = require("express");
const authenticate = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded());

global.users = [
  {
    username: "john",
    password: "password",
  },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log(req.body);

  const user = users.find(
    (user) => user.username == username && user.password == password
  );

  if (user) {
    // generate the json web token
    const token = jwt.sign({ username: user.username }, "SECRETKEY");

    res.json({ success: true, token: token });
  } else {
    // response with not authenticated
    res.json({ success: false, message: "Not authenticated" });
  }
});

app.post("/data", authenticate, (req, res) => {
  const { username } = req.body;

  console.log(req.body);

  const userAcct = users.filter((user) => user.username === username);

  console.log(userAcct);

  res.json(userAcct);
});

app.get("/", (req, res) => {
  res.send({
    message: "Hello World",
  });
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});
