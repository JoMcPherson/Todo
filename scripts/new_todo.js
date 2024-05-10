window.onload = init;

function init() {
  const users = document.getElementById("user");
  users.innerHTML = "<option id='default'>Select User</option>";
  fetch("api/users")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((user) => {
        users.innerHTML += `<option value="${user.id}">${user.name}</option>`;
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
  const form = document.getElementById("new-todo-form");
  form.onsubmit = async function (event) {
    event.preventDefault();
    const userid = document.getElementById("user").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const deadline = document.getElementById("deadline").value;
    const priority = document.getElementById("priority").value;

    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid,
        category,
        description,
        deadline,
        priority,
      }),
    }).then((response) => {
      if (response.status === 201) {
        window.location.href = "/";
      } else {
        console.error("Failed to create course");
        console.log("nice try!");
      }
    });
  };
}
