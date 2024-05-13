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
      todos.innerHTML = "";
      data.forEach((todo) => {
        date = new Date(todo.deadline);
        const card = document.createElement("div");
        card.classList.add("card", "mb-3", "shadow-sm", "mr-2");
        card.style = "margin: 0 auto; width: 18rem";
        card.id = todo.id;
        card.innerHTML = `
          <div class="card-body">
          <img src="../images/thumbtack.png" class="card-img-left" style="width: 2rem; margin-right: 0.5rem;" alt="Thumbtack Image">
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
            <div>
            <button hidden name="delete" class="btn btn-danger mb-3" id="delete-${
              todo.id
            }">
            Delete
          </button>
          </div>
            <button name="details" class="btn btn-info" id="details-${
              todo.id
            }">More Details</button>
            <button name="complete" class="btn btn-success"
             id="completed-${todo.id}">
              ${todo.completed ? "Mark Pending" : "Mark Complete"}
            </button>
          </div>`;
        todos.appendChild(card);
      });

      document.getElementsByName("details").forEach((button) => {
        button.addEventListener("click", function () {
          if (button.textContent === "More Details") {
            button.textContent = "Less Details";
          } else {
            button.textContent = "More Details";
          }
          const id = button.id.split("-")[1];
          const category = document.getElementById(`${id}-category`);
          category.hidden = !category.hidden;
          const priority = document.getElementById(`${id}-priority`);
          priority.hidden = !priority.hidden;
          const completed_status = document.getElementById(`${id}-completed`);
          completed_status.hidden = !completed_status.hidden;
          const del = document.getElementById(`delete-${id}`);
          del.onclick = function () {
            fetch(`/api/todos/${id}`, {
              method: "DELETE",
            }).then((response) => {
              if (response.status === 204) {
                const card = document.getElementById(`${id}`);
                card.hidden = true;
              }
            });
          };
          del.hidden = !del.hidden;
        });
      });

      document.getElementsByName("complete").forEach((button) => {
        button.addEventListener("click", function () {
          const id = button.id.split("-")[1];
          fetch(`/api/todos/${id}`, {
            method: "PUT",
          }).then((response) => {
            if (response.status === 200) {
              const completed_status = document.getElementById(
                `${id}-completed`
              );
              completed_status.textContent = `Completed: ${
                completed_status.textContent.includes("Yes") ? "No" : "Yes"
              }`;
              button.textContent =
                button.textContent === "Mark Complete"
                  ? "Mark Pending"
                  : "Mark Complete";
            }
          });
        });
      });
    });
}
