window.onload = init;

function init() {
  const users = document.getElementById("user-selection");
  users.innerHTML = "<option id='default'>Select User</option>";
  fetch("api/users")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((user) => {
        users.innerHTML += `<option value="${user.id}">${user.name}</option>`;
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
  users.onchange = updateToDos;
}

function updateToDos() {
  const user = document.getElementById("user-selection").value;
  const todos = document.getElementById("todos");
  fetch(`api/todos/byuser/${user}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      todos.innerHTML = "";
      data.forEach((todo) => {
        date = new Date(todo.deadline);
        const card = document.createElement("div");
        card.classList.add("card", "mb-3", "shadow-sm", "mr-3", "width-30");
        card.style.width = "18rem";
        card.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">${todo.description}</h5>
            <p class="card-text">
              Deadline: ${date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
            <p class="card-text" hidden id="${todo.id}-category">
              Category: ${todo.category}
            </p>
            <p class="card-text" hidden id="${todo.id}-priority">
              Priority: ${todo.priority}
            </p>
            <p class="card-text" hidden id="${todo.id}-completed">
              Completed: ${todo.completed ? "Yes" : "No"}
            </p>
            <button name="details" class="btn btn-info" id="details-${todo.id}">
              More Details
            </button>
            <button name="complete" class="btn btn-success" id="completed-${
              todo.id
            }">
              ${todo.completed ? "Uncomplete" : "Complete"}
            </button>
          </div>`;
        todos.appendChild(card);
      });

      document.getElementsByName("details").forEach((button) => {
        button.addEventListener("click", function () {
          const id = button.id.split("-")[1];
          const category = document.getElementById(`${id}-category`);
          category.hidden = !category.hidden;
          const priority = document.getElementById(`${id}-priority`);
          priority.hidden = !priority.hidden;
          const completed_status = document.getElementById(`${id}-completed`);
          completed_status.hidden = !completed_status.hidden;
          button.textContent = "Less Details";
        });
      });

      document.getElementsByName("complete").forEach((button) => {
        button.addEventListener("click", function () {
          const id = button.id.split("-")[1];
          fetch(`/api/todos/${id}`, {
            method: "PUT",
          }).then((response) => {
            if (response.status === 200) {
              console.log("success", `${id}-completed`);
              const completed_status = document.getElementById(
                `${id}-completed`
              );
              console.log(completed_status.textContent, "text");
              completed_status.textContent = `Completed: ${
                completed_status.textContent.includes("Yes") ? "No" : "Yes"
              }`;
              button.textContent =
                button.textContent === "Complete" ? "Uncomplete" : "Complete";
            }
          });
        });
      });
    });
}
