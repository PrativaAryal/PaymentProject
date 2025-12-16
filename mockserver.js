const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("mockdb.json");
const middlewares = jsonServer.defaults();
const bodyParser = require("body-parser");

server.use(middlewares);
server.use(bodyParser.json());

// Signup
server.post("/user/register", (req, res) => {
  const db = router.db;
  const users = db.get("users").value();
  const exists = users.find(u => u.mobile_number === req.body.mobile_number);
  if (exists) return res.status(400).json({ error: "User already exists" });

  const newUser = {
    id: Date.now(),
    username: req.body.username,
    mail: req.body.mail,
    mobile_number: req.body.mobile_number,
    password: req.body.password
  };
  db.get("users").push(newUser).write();
  res.json({ ok: true, data: newUser });
});

// Login
server.post("/user/login", (req, res) => {
  const db = router.db;
  const user = db.get("users")
    .find({ mobile_number: req.body.mobile_number, password: req.body.password })
    .value();
  if (!user) return res.status(400).json({ error: "Invalid credentials" });
  res.json({ ok: true, data: { token: "mocktoken123", user } });
});

// Request OTP
server.post("/user/password/forget", (req, res) => {
  const db = router.db;
  const user = db.get("users").find({ mail: req.body.mail }).value();
  if (!user) return res.status(400).json({ error: "Email not found" });

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  db.get("otp").push({ mail: req.body.mail, otp: otpCode }).write();
  console.log("OTP sent (mock):", otpCode);
  res.json({ ok: true, message: "OTP sent to email" });
});

// Reset Password
server.put("/user/password/change", (req, res) => {
  const db = router.db;
  const otpRecord = db.get("otp").find({ mail: req.body.mail, otp: req.body.otp }).value();
  if (!otpRecord) return res.status(400).json({ error: "Invalid OTP" });

  db.get("users")
    .find({ mail: req.body.mail })
    .assign({ password: req.body.new_password })
    .write();

  db.get("otp").remove({ mail: req.body.mail }).write();

  res.json({ ok: true, message: "Password changed successfully" });
});

server.use(router);
server.listen(4000, () => {
  console.log("Mock API running at http://localhost:4000");
});
