// const emailInput = document.getElementById("email");
// const passwordInput = document.getElementById("password");
// const form = document.getElementById("loginForm");

// form.addEventListener("submit", function (e) {

//     e.preventDefault();

//     const email = emailInput.value;
//     const password = passwordInput.value;

//     console.log("Email:", email);
//     console.log("Password:", password);
// });

// document.addEventListener("DOMContentLoaded", function () {

//     const form = document.getElementById("loginForm");

//     form.addEventListener("submit", function (e) {
//         e.preventDefault();

//         const email = document.getElementById("email").value;
//         const password = document.getElementById("password").value;

//         console.log("Email:", email);
//         console.log("Password:", password);
//     });

// });

// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("loginForm");

//   form.addEventListener("submit", function (e) {
//     e.preventDefault(); // stop reload

//     // read values
//     const email = document.getElementById("email").value.trim();
//     const password = document.getElementById("password").value.trim();

//     // error elements
//     const emailError = document.getElementById("emailError");
//     const passwordError = document.getElementById("passwordError");

//     // reset errors
//     emailError.textContent = "";
//     passwordError.textContent = "";

//     let isValid = true;

//     // EMAIL VALIDATION
//     if (email === "") {
//       emailError.textContent = "Email is required";
//       isValid = false;
//     } else if (!email.includes("@")) {
//       emailError.textContent = "Enter a valid email";
//       isValid = false;
//     }

//     // PASSWORD VALIDATION
//     if (password === "") {
//       passwordError.textContent = "Password is required";
//       isValid = false;
//     } else if (password.length < 6) {
//       passwordError.textContent = "Password must be at least 6 characters";
//       isValid = false;
//     }

//     // FINAL CHECK
//     if (isValid) {
//       console.log("Form is valid ✅");
//       //   console.log("Email:", email);
//       //   console.log("Password:", password);

//       const loginData = {
//         email: email,
//         password: password,
//       };

//       console.log("Email:", loginData.email);
//       console.log("Password:", loginData.password);

//       // redirect to dashboard after success msg
//       const successMsg = document.getElementById("successMsg");
//       successMsg.textContent = "Login successful! Redirecting...";

//       setTimeout(function () {
//         // setting user info in local storage so that we can use it in future
//         localStorage.setItem("userEmail", email);
//         window.location.href = "../dashboard.html";
//       }, 1500);
//     }
//   });
// });
// document.addEventListener("DOMContentLoaded", () => {

//   const currentPage = window.location.pathname;// https://localhost/127:00.../login.html

//   // Prevent logged-in user from accessing login page
//   if (currentPage.includes("login.html")) {
//     if (localStorage.getItem("token")) {
//       window.location.href = "../dashboard.html";
//       return;
//     }
//   }

//   const form = document.getElementById("loginForm");

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault(); // stop page reload

//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//          //error elements
//     const emailError = document.getElementById("emailError");
//     const passwordError = document.getElementById("passwordError");

//     // reset errors
//     emailError.textContent = "";
//     passwordError.textContent = "";

//     let isValid = true;

//     // EMAIL VALIDATION
//     if (email === "") {
//       emailError.textContent = "Email is required";
//       isValid = false;
//     } else if (!email.includes("@")) {
//       emailError.textContent = "Enter a valid email";
//       isValid = false;
//     }

//     // PASSWORD VALIDATION
//     if (password === "") {
//       passwordError.textContent = "Password is required";
//       isValid = false;
//     } else if (password.length < 6) {
//       passwordError.textContent = "Password must be at least 6 characters";
//       isValid = false;
//     }

//     if(isValid){

//     try {
//       const response = await fetch("http://localhost:4001/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });
//       console.log(response);

//       const data = await response.json();
//       console.log(data);

//       if (data.success == true) {
//         // Save login state
//         localStorage.setItem("isLoggedIn", "true");
//         localStorage.setItem("userEmail", email);
//         alert("Login successful");

//         window.location.href = "../dashboard.html";
//       }
//       else {
//           alert("Invalid credentials");
//         }
//     } catch (error) {
//       alert("Server error");
//       console.error(error);
//     }
//   }
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();

  // Prevent logged-in user from accessing login page
  if (currentPage === "login.html") {
    if (localStorage.getItem("token")) {
      window.location.href = "../dashboard.html";
      return;
    }
  }

  const form = document.getElementById("loginForm");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const emailError = document.getElementById("emailError");
      const passwordError = document.getElementById("passwordError");

      emailError.textContent = "";
      passwordError.textContent = "";

      let isValid = true;

      // EMAIL VALIDATION
      if (email === "") {
        emailError.textContent = "Email is required";
        isValid = false;
      } else if (!email.includes("@")) {
        emailError.textContent = "Enter a valid email";
        isValid = false;
      }

      // PASSWORD VALIDATION
      if (password === "") {
        passwordError.textContent = "Password is required";
        isValid = false;
      } else if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters";
        isValid = false;
      }

      if (isValid) {
        try {
          const response = await fetch("http://localhost:4001/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
          
          const data = await response.json();
          if (data.success === true) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userEmail", email);

            alert(data.message);

           window.location.href = "../dashboard.html";
          } else {
            alert("Invalid credentials");
          }
        } catch (error) {
          alert("Server error");
          console.error(error);
        }
      }
    });
  }
});
