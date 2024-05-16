window.onload = init;

async function init() {
  const users = document.getElementById("user-selection");
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("user");
  users.innerHTML = "<option id='default'>Select User</option>";
  fetch("api/users")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((user) => {
        if (user.id === parseInt(id)) {
          users.innerHTML += `<option value="${user.id}|${user.profilePicUrl}" selected>${user.name}</option>`;
          updateToDos();
        } else {
          users.innerHTML += `<option value="${user.id}|${user.profilePicUrl}">${user.name}</option>`;
        }
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
  users.onchange = updateToDos;

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
}

function updateToDos() {
  const user = document.getElementById("user-selection").value;
  const idAndProfile = user.split("|"); // Split the value using the pipe character
  const userId = idAndProfile[0];
  const profilePicUrl = idAndProfile[1];
  const profilePic = document.getElementById("user-image");
  profilePic.src = `../${profilePicUrl}`;

  const todos = document.getElementById("todos");
  fetch(`api/todos/byuser/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      todos.innerHTML = "";
      const row = document.createElement("div");
      row.classList.add("row");
      if (data.length === 0) {
        const noToDos = document.createElement("h3");
        noToDos.innerHTML = "No To-Dos Yet!";
        noToDos.style.color = "white";
        const add = document.createElement("p");
        add.innerHTML =
          "<a href='./new_todo' class='mt-3' style='color: white'>Click here to start adding to dos</a>";
        noToDos.appendChild(add);
        todos.appendChild(noToDos);
      }

      data.forEach((todo) => {
        date = new Date(todo.deadline);
        const col = document.createElement("div");
        col.classList.add("col-md-4", "mb-3");

        const card = document.createElement("div");
        card.classList.add("card", "shadow-sm");
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
            }">Delete</button>
          </div>
          <button name="details" class="btn btn-info" id="details-${
            todo.id
          }">More Details</button>
          <button name="complete" class="btn btn-success" id="completed-${
            todo.id
          }">
            ${todo.completed ? "Mark Pending" : "Mark Complete"}
          </button>
        </div>`;

        col.appendChild(card);
        row.appendChild(col);
      });

      todos.appendChild(row);

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
