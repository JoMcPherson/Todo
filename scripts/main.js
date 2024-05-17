// main.js
const login = async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:8083/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const result = await response.json();

  const messageDiv = document.getElementById("message");
  if (response.ok) {
    // Store the username in local storage
    localStorage.setItem("username", result.username);
    window.location.href = "http://localhost:8083/";
  } else {
    messageDiv.textContent = result.message;
    messageDiv.style.color = "red";
  }
};

const logout = () => {
  // Clear the local storage
  localStorage.removeItem("username");

  // Optionally, notify the server about logout
  fetch("http://localhost:8083/logout", {
    method: "POST",
  })
    .then((response) => response.json())
    .then(() => {
      window.location.href = "http://localhost:8083/";
    });
};
