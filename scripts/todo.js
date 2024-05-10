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
  console.log(user, "user");
  const todos = document.getElementById("todos");
  fetch(`api/todos/byuser/${user}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      todos.innerHTML = `<th>Description</th><th>Deadline</th>`;
      data.forEach((todo) => {
        date = new Date(todo.deadline);
        todos.insertRow().innerHTML = `  <td>${todo.description}</td>
        <td>${date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}</td>
        <td><button name="details" class="btn btn-info" id="details-${
          todo.id
        }">More Details
        </button></td>
        <td hidden id="${todo.id}-category">${todo.category}</td>
        <td hidden id="${todo.id}-priority" >${todo.priority}</td>
        <td hidden id="${todo.id}-completed">${
          todo.completed ? "<img src=''/>" : "<img src=''/>"
        }</td> 
        <td ><button hidden name="complete" class="btn btn-success" id="completed-${
          todo.id
        }">${todo.completed ? "Uncomplete" : "Complete"}</button></td>`;
      });
      const detailsButtons = document.getElementsByName("details");
      for (let button of detailsButtons) {
        button.onclick = function () {
          const id = button.id.split("-")[1];
          const category = document.getElementById(`${id}-category`);
          category.hidden = false;
          const priority = document.getElementById(`${id}-priority`);
          priority.hidden = false;
          const completed_status = document.getElementById(`${id}-completed`);
          completed_status.hidden = false;
          const completed = document.getElementById(`completed-${id}`);
          completed.hidden = false;
        };
      }
      const completeButtons = document.getElementsByName("complete");
      for (let button of completeButtons) {
        button.onclick = function () {
          const id = button.id.split("-")[1];
          fetch(`/api/todos/${id}`, {
            method: "PUT",
          }).then((response) => {
            if (response.status === 200) {
              const completed_status = document.getElementById(
                `${id}-completed`
              );
              if (completed_status.innerHTML === "yes") {
                completed_status.innerHTML = "no";
              } else {
                completed_status.innerHTML = "yes";
              }
              if (button.innerHTML === "Uncomplete") {
                button.innerHTML = "Complete";
              } else {
                button.innerHTML = "Uncomplete";
              }
            }
          });
        };
      }
    });
}
