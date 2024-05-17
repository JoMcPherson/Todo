window.onload = init;

async function init() {
  const username = localStorage.getItem("username");

  if (username) {
    document.getElementById("nav").hidden = false;
    document.getElementById("loggedout").hidden = true;
    document.getElementById("main").hidden = false;
    document.getElementById("logout").hidden = false;
    document.getElementById("username").textContent = username;
    console.log(username, "is logged in");
  }

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
