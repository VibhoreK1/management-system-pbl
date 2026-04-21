const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const Project = require("./models/Project");

const authenticateToken = require("./middleware/auth");

const secret_Key = "SecuredKey123";

const app = express();

const PORT = 4001;

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://vibhorkapoor123:admin123@inventory-cluster.82b9clu.mongodb.net/PMS",
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  const obj = {
    name: "rishi",
    Class: "Degree",
  };

  res.send(obj);
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.json({
        userExist: true,
        message: "User already exist. Please Login",
      });
    } else {
      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // save user
      const newUser = new User({
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.json({
        message: "User registered successfully",
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// app.post("/login", (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   // basic validation
//   if (!email || !password) {
//     return res.status(400).json({
//       message: "Email and password are required",
//     });
//   }

//   // fake authentication (for now)
//   if (email === "vibhorkapoor123@gmail.com" && password === "vib@123") {

//     const token = jwt.sign(
//       { email: email },
//       secret_Key,
//       { expiresIn: "1h" }
//     );

//     return res.json({
//       success: true,
//       token:token,
//       message: "Login successful",
//     });
//   }

//   return res.status(401).json({
//     message: "Invalid credentials",
//   });
// });

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Wrong password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      secret_Key,
      { expiresIn: "1h" },
    );

    res.json({
      success: true,
      token: token,
      message: "Login successful",
    });
  } catch (err) {
    res.status(500).json({ message: "Login error" });
  }
});

//dashboard
app.get("/dashboard-data", authenticateToken, (req, res) => {
  res.json({
    message: "Welcome to protected dashboard",
    user: req.user,
  });
});

// User profile
app.get("/profile", authenticateToken, (req, res) => {
  res.json({
    message: "User profile data",
    user: req.user,
  });
});

//Create Project 

app.post("/create-project", authenticateToken, async (req, res) => {

  const { name, description } = req.body;

  try {

    const newProject = new Project({
      name,
      description,
      createdBy: req.user.userId   // from JWT
    });

    await newProject.save();

    res.json({
      message: "Project created successfully",
      project: newProject
    });

  } catch (err) {
    res.status(500).json({ message: "Error creating project" });
  }

});

//Get All Projects
app.get("/projects", authenticateToken, async (req, res) => {

  try {

    const projects = await Project.find({
      createdBy: req.user.userId
    });

    res.json(projects);

  } catch (err) {
    res.status(500).json({ message: "Error fetching projects" });
  }

});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
