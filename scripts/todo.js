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
  users.onchange = updateToDos;
}

function updateToDos() {
  const user = document.getElementById("user").value;
  const todos = document.getElementById("todos");
  console.log("hello");
  fetch(`api/todos?userId=${user}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      todos.innerHTML = `<th>Category</th><th>Description</th><th>Deadline</th><th>Priority</th><th>Completed?</th>`;
      data.forEach((todo) => {
        date = new Date(todo.deadline);
        todos.insertRow().innerHTML = `<td>${todo.category}</td
        <td>${todo.description}</td>
        <td>${date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}</td>
        <td>${todo.priority}</td>
        <td>${todo.completed ? "yes" : "no"}</td>
        <td><button class="complete" id="${todo.id}">${
          todo.completed ? "Uncomplete" : "Complete"
        }</button></td>`;
      });
      const buttons = document.getElementsByClassName("complete");
      for (let button of buttons) {
        button.onclick = function () {
          console.log("complete clicked");
          fetch(`/api/todos/${button.id}`, {
            method: "PUT",
          }).then((response) => {
            if (response.status === 200) {
              updateToDos();
            }
          });
        };
      }
    });
}
