window.onload = init;

async function init() {
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", async function (event) {
    const dropdownList = document.getElementById("dropdownMenu");
    dropdownList.innerHTML = "";
    const search_term = searchInput.value.toLowerCase();
    const response = await fetch("/api/todos");
    const data = await response.json();

    if (data.length > 0) {
      data.forEach((item) => {
        console.log(item.description.toLowerCase(), "item");
        console.log(search_term, "search_term");
        if (item.description.toLowerCase().includes(search_term)) {
          const listItem = document.createElement("li");
          const link = document.createElement("a");
          link.href = `/todo_details?id=${item.id}`; // Add your link URL here
          link.textContent = item.description;
          listItem.appendChild(link);
          dropdownList.appendChild(listItem);
        }
      });
    } else {
      dropdownList.innerHTML =
        '<option value="" selected disabled hidden>No items found</option>';
    }
  });

  const searchParams = new URLSearchParams(window.location.search);
  const response = await fetch("api/users"); // Wait for the fetch to complete
  const users = await response.json();
  const id = searchParams.get("id");
  fetch(`api/todos/${id}`)
    .then((response) => response.json())
    .then((todo) => {
      const details = document.getElementById("details");
      const user = users.find((user) => user.id === parseInt(todo.userid));
      date = new Date(todo.deadline);
      details.innerHTML = `
      <div class="card-body card mb-3 shadow-sm mr-2" >
      <img src="../images/thumbtack.png" class="card-img-left" style="width: 2rem; margin-right: 0.5rem;" alt="Thumbtack Image">
      <h3 class="card-title">${user.name}</h3>
      <h5 class="card-title">${todo.description}</h5>
      <p class="card-text">
        Deadline: ${date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </p>
      <p class="card-text" id="${todo.id}-category">
        Category: ${todo.category}
      </p>
      <p class="card-text" id="${todo.id}-priority">
        Priority: ${todo.priority}
      </p>
      <p class="card-text" id="${todo.id}-completed">
        Completed: ${todo.completed ? "Yes" : "No"}
      </p>
      <div>
     
    </div>`;
    });
}
