window.onload = init;

function init() {
  const fileInput = document.getElementById("fileInput");
  const status = document.getElementById("status");

  fileInput.onchange = function () {
    const file = fileInput.files[0];
    if (!file) {
      status.textContent = "Please select a file.";
      return;
    } else {
      const upload = document.getElementById("upload");
      upload.hidden = false;
    }
  };

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", async function () {
    const dropdownList = document.getElementById("dropdownMenu");
    dropdownList.innerHTML = "";
    const search_term = searchInput.value.toLowerCase();
    const response = await fetch("/api/todos");
    const data = await response.json();

    if (data.length > 0) {
      data.forEach((item) => {
        if (item.description.toLowerCase().includes(search_term)) {
          const listItem = document.createElement("li");
          const link = document.createElement("a");
          link.href = `/todo_details?id=${item.id}`;
          link.textContent = item.description;
          listItem.appendChild(link);
          dropdownList.appendChild(listItem);
        }
      });

      if (dropdownList.innerHTML === "") {
        dropdownList.innerHTML =
          '<option value="" selected>No Results</option>';
      }
    }
  });
  const form = document.getElementById("register");
  form.onsubmit = async function (event) {
    event.preventDefault();
    const first_name = document.getElementById("first-name").value;
    const last_name = document.getElementById("last-name").value;
    const name = first_name + " " + last_name;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm-password").value;
    const profilePicUrl = document.getElementById("profile").value;
    // Check username availability
    fetch(`/api/username_available/${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.available) {
          const usernameAlert = document.getElementById("username-danger");
          usernameAlert.hidden = false;
        } else {
          // Username is available, proceed with form submission
          if (password == confirm_password) {
            fetch("/api/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                username,
                password,
                profilePicUrl,
              }),
            }).then((response) => {
              if (response.status === 201) {
                response.json().then((data) => {
                  form.hidden = true;
                  window.location.href = `/todos?user=${data.id}`;
                });
              } else {
                console.log("Registration failed");
              }
            });
          } else {
            const passwordAlert = document.getElementById("password-danger");
            console.log(passwordAlert);
            passwordAlert.hidden = false;
          }
        }
      });
  };
}

function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const status = document.getElementById("status");
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("file", file);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "api/upload", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const profile = document.getElementById("profile");
        profile.value = response.path;
        status.textContent = "File uploaded successfully; \u2714";
      } else {
        console.error("Error uploading file:", xhr.status, xhr.statusText);
        status.textContent = "Error uploading file. Please try again.";
      }
    }
  };

  xhr.send(formData);
}
