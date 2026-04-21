document.addEventListener("DOMContentLoaded", () => {

  const welcomeText = document.getElementById("welcomeUser");

  const token = localStorage.getItem("token");

  // If no token → go to login
  if (!token) {
    window.location.href = "login/login.html";
    return;
  }

  // Fetch protected data
  // fetch("http://localhost:4001/dashboard-data", {
  //   method: "GET",
  //   headers: {
  //     "Authorization": "Bearer " + token
  //   }
  // })
  // .then(res => res.json())
  // .then(data => {

  //   console.log("Dashboard Data:", data);

  //   const welcomeHeading =document.getElementById("Welcome");
  //   welcomeHeading.textContent = data.message;

  //   const email = localStorage.getItem("userEmail");

  //   if (email) {
  //     const username = email.split("@")[0];

  //     document.getElementById("email").textContent =
  //       "Welcome to Dashboard: " + username;
  //   }

  // })
  // .catch(err => {
  //   console.error("Error:", err);
  // });

  // get user details from backend

  fetch("http://localhost:4001/profile", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    }
  })
  .then(res => res.json())
  .then(data => {

    console.log(data);

    if (data.user) {
      welcomeText.textContent = "Welcome " + data.user.email;
    }

  })
  .catch(err => {
    console.log(err);
  });



  const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");

    window.location.href = "login/login.html";
  });
}
});

