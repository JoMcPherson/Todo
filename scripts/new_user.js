window.onload = init;

function init() {
  const form = document.getElementById("register");
  form.onsubmit = async function (event) {
    event.preventDefault();
    const first_name = document.getElementById("first-name").value;
    const last_name = document.getElementById("last-name").value;
    const name = first_name + " " + last_name;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm-password").value;

    // Check username availability
    fetch(`/api/username_available/${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.available) {
          alert("Username already taken");
          document.getElementById("username").value = "";
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
              }),
            }).then((response) => {
              if (response.status === 201) {
                response.json().then((data) => {
                  console.log(data);
                  form.hidden = true;
                  console.log(form);
                  alert("Registration successful");
                  window.location.href = "/";
                });
              } else {
                console.log("Registration failed");
              }
            });
          } else {
            alert("Passwords do not match");
          }
        }
      });
  };
}