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
  const categories = document.getElementById("category");
  categories.innerHTML = "<option id='default'>Select Category</option>";
  fetch("api/categories")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((category) => {
        categories.innerHTML += `<option value="${category.name}">${category.name}</option>`;
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
  const form = document.getElementById("new-todo-form");
  console.log("here");
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
        fetch(`/api/todos/byuser/${userid}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            const h2 = document.getElementById("success");
            h2.innerHTML = `Successfully created a new todo of ${description}!`;
            const h3 = document.getElementsByClassName("add-another");
            h3.innerHTML = `Care to add another?`;
            const h4 = document.getElementById("current-todos");
            h4.innerHTML = `Here are your current todos:`;
            description.value = "";
            deadline.value = "";
            priority.value = "";
            const todos = document.getElementById("todos");
            todos.innerHTML = `<th>Category</th><th>Description</th><th>Deadline</th><th>Priority</th><th>Completed?</th>`;
            data.forEach((todo) => {
              date = new Date(todo.deadline);
              todos.insertRow().innerHTML = `<td>${todo.category}</td>
              <td>${todo.description}</td>
              <td>${date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}</td>
              <td>${todo.priority}</td>
              <td>${todo.completed ? "yes" : "no"}</td>`;
            });
          });
      } else {
        console.error("Failed to create course");
        console.log("nice try!");
      }
    });
  };
}
