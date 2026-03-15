const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const authenticateToken = require("./middleware/auth");


const secret_Key ="SecuredKey123";

const app = express();

const PORT = 4001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
const obj ={
    name:"Shukla",
    Class:1
}

  res.send(obj);
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

    const token = jwt.sign(
      { email: email },
      secret_Key,
      { expiresIn: "1h" }
    );


    return res.json({
      success: true,
      token:token,
      message: "Login successful",
    });
  }

  return res.status(401).json({
    message: "Invalid credentials",
  });
});


//dashboard
app.get("/dashboard-data", authenticateToken, (req, res) => {

  res.json({
    message: "Welcome to protected dashboard",
    user: req.user
  });

});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
