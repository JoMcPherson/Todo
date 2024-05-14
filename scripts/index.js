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
}
