window.onload = init;

function init() {
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
  form.onchange = function () {
    const success = document.getElementById("success");
    success.hidden = true;
  };
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
            document.getElementById("description").value = "";
            document.getElementById("deadline").value = "";
            document.getElementById("priority").value = "";
            document.getElementById("category").value = "Select Category";
            document.getElementById("user").value = "Select User";
            console.log(data);
            const success = document.getElementById("success");
            success.hidden = false;
            const h4 = document.getElementById("current-todos");
            h4.innerHTML = `View all todos? <a href="/todos">Click here</a>`;
          });
      } else {
        console.error("Failed to create course");
        console.log("nice try!");
      }
    });
  };
}
