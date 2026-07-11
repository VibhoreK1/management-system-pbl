document.addEventListener("DOMContentLoaded", () => {

  // CHECK LOGIN
  
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    window.location.href = "login/login.html";
    return;
  }

 
  // LOAD USER PROFILE
  
  const welcomeText = document.getElementById("welcomeUser");

  async function loadProfile() {
    try {
      const response = await fetch("http://localhost:4001/profile", {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token
        }
      });

      const data = await response.json();

      console.log("Profile:", data);

      if (data.user && welcomeText) {
        welcomeText.textContent = "Welcome " + data.user.email;
      }

    } catch (err) {
      console.log(err);
    }
  }

  
  //  CREATE PROJECT
  
  const projectForm = document.getElementById("projectForm");

  if (projectForm) {
    projectForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("projectName").value;
      const description = document.getElementById("projectDesc").value;

      try {
        const response = await fetch("http://localhost:4001/create-project", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
          body: JSON.stringify({ name, description })
        });

        const data = await response.json();

        alert(data.message);

        // reload projects after creating
        loadProjects();

        // clear form
        projectForm.reset();

      } catch (err) {
        console.log(err);
      }
    });
  }

  // LOAD PROJECTS

  const projectList = document.getElementById("projectList");

  async function loadProjects() {

    if (!projectList) return;

    try {
      const response = await fetch("http://localhost:4001/projects", {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token
        }
      });

      const projects = await response.json();

      console.log("Projects:", projects);

      projectList.innerHTML = "";

      if (projects.length === 0) {
        projectList.innerHTML = "<li>No projects found</li>";
        return;
      }

      projects.forEach(project => {
        const li = document.createElement("li");
        li.textContent = `${project.name} - ${project.description}`;
        projectList.appendChild(li);
      });

    } catch (err) {
      console.log(err);
    }
  }

  // LOGOUT

  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      alert("Logged out");
      window.location.href = "login/login.html";
    });
  }

 // INITIAL LOAD
  
  loadProfile();
  loadProjects();

});