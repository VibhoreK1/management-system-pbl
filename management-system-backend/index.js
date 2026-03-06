const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hi Vib how are u?");
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // basic validation
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  // fake authentication (for now)
  if (email === "vibhorkapoor123@gmail.com" && password === "vib@123") {
    return res.json({
      success: true,
      message: "Login successful",
    });
  }

  return res.status(401).json({
    message: "Invalid credentials",
  });
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
