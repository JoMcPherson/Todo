const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

///////////////////////////////////////////////////////////////////////
//   MIDDLEWARE (CONFIGURATIONS) //////////////////////////////////////
///////////////////////////////////////////////////////////////////////

// Permit cross-origin requests
app.use(cors());

// Support application/x-www-form-urlencoded data
app.use(express.urlencoded({ extended: false }));

// Support application/json data
app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.json(req.file);
});

// Serve static front-end files (HTML, etc.) from "./public"
// app.use(express.static("public"));

///////////////////////////////////////////////////////////////////////
//   API ENDPOINTS ////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
// GET index
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/pages/index.html"));
});

app.get("/upload", function (req, res) {
  res.sendFile(path.join(__dirname + "/pages/upload.html"));
});

app.get("/todos", function (req, res) {
  res.sendFile(path.join(__dirname + "/pages/todos.html"));
});

app.get("/new_todo", function (req, res) {
  res.sendFile(path.join(__dirname + "/pages/new_todo.html"));
});

app.get("/todo_details", function (req, res) {
  res.sendFile(path.join(__dirname + "/pages/todo_details.html"));
});

app.get("/new_user", function (req, res) {
  res.sendFile(path.join(__dirname + "/pages/new_user.html"));
});

// Get all categories
app.get("/api/categories", function (request, response) {
  console.info("LOG: Got a GET request for all categories");

  const json = fs.readFileSync(__dirname + "/data/categories.json", "utf8");
  const categories = JSON.parse(json);

  // LOG data for tracing
  console.info("LOG: Returned categories are ->", categories);

  response.status(200).json(categories);
});

// Get all TODOs
app.get("/api/todos", function (request, response) {
  console.info("LOG: Got a GET request for all todos");

  // Read todos.json
  const json = fs.readFileSync(__dirname + "/data/todos.json", "utf8");
  const todos = JSON.parse(json);

  // LOG data for tracing
  console.info("LOG: Returned todos are ->", todos);

  response.status(200).json(todos);
});

// Get one TODO by id
app.get("/api/todos/:id", function (request, response) {
  const requestedId = request.params.id;
  console.info("LOG: Got a GET request for todo", requestedId);

  const json = fs.readFileSync(__dirname + "/data/todos.json", "utf8");
  const todos = JSON.parse(json);

  // Find the requested todo
  const matchingTodo = todos.find(
    (todo) => String(todo.id) === String(requestedId)
  );

  // If todo not found
  if (!matchingTodo) {
    console.warn(`LOG: **NOT FOUND**: todo ${requestedId} does not exist!`);

    response.status(404).end();

    return;
  }

  // LOG data for tracing
  console.info("LOG: Returned todo is ->", matchingTodo);

  response.status(200).json(matchingTodo);
});

// Get all TODOs for a given user id
app.get("/api/todos/byuser/:id", function (request, response) {
  const requestedId = request.params.id;
  console.info("LOG: Got a GET request for todos for userid", requestedId);

  const json = fs.readFileSync(__dirname + "/data/todos.json", "utf8");
  const todos = JSON.parse(json);

  // Find the requested todos
  const matchingTodos = todos.filter(
    (todo) => String(todo.userid) === String(requestedId)
  );

  // LOG data for tracing
  console.info("LOG: Returned todos are ->", matchingTodos);

  response.status(200).json(matchingTodos);
});

// Get all users (without passwords)
app.get("/api/users", function (request, response) {
  console.info("LOG: Got a GET request for all users");

  const json = fs.readFileSync(__dirname + "/data/users.json", "utf8");
  const users = JSON.parse(json);

  // Copy users to an new array -- omitting the passwords
  const usersWithoutPasswords = [];
  for (const user of users) {
    usersWithoutPasswords.push({
      id: user.id,
      name: user.name,
      username: user.username,
      profilePicUrl: user.profilePicUrl,
    });
  }

  // LOG data for tracing
  console.info(
    "LOG: Returned users (without passwords) are ->",
    usersWithoutPasswords
  );

  response.status(200).json(usersWithoutPasswords);
});

// Find out if a specific username is available
app.get("/api/username_available/:username", function (request, response) {
  const requestedUsername = request.params.username;
  console.info(
    `LOG: Checking to see if username ${requestedUsername} is available`
  );

  const json = fs.readFileSync(__dirname + "/data/users.json", "utf8");
  const users = JSON.parse(json);

  // See if username already exists
  const matchingByUsername = (user) =>
    user.username.toLowerCase() === requestedUsername.toLowerCase();
  const availability = { available: !users.some(matchingByUsername) };

  // LOG response for tracing
  console.info("LOG: Returned message ->", availability);

  response.status(200).json(availability);
});

// GET a specific user
// NOTE: this endpoint returns the user without the password
app.get("/api/users/:username", function (request, response) {
  const username = request.params.username;
  console.info("LOG: Got a GET request for user with username " + username);

  const json = fs.readFileSync(__dirname + "/data/users.json", "utf8");
  const user = JSON.parse(json);

  // Find the user
  const byUsername = (user) =>
    user.username.toLowerCase() === username.toLowerCase();
  const matchingUser = user.find(byUsername);

  // If no matching user
  if (!matchingUser) {
    console.warn(`LOG: **NOT FOUND**: user ${username} does not exist!`);

    response.status(404).end();

    return;
  }

  // Create a copy without the password
  const userWithoutPassword = {
    id: matchingUser.id,
    name: matchingUser.name,
    username: matchingUser.username,
  };

  // LOG data for tracing
  console.info("LOG: Returned user is ->", userWithoutPassword);

  response.status(200).json(userWithoutPassword);
});

// POST a new todo
app.post("/api/todos", function (request, response) {
  console.info("LOG: Got a POST request to add a todo");
  console.info("LOG: Message body ->", JSON.stringify(request.body));

  // If not all TODO data passed, reject the request
  const { userid, category, description, deadline, priority } = request.body;
  if (!userid || !category || !description || !deadline || !priority) {
    console.warn("LOG: **MISSING DATA**: one or more todo properties missing");

    response.status(400).json({
      error:
        "Missing data, can't process: one or more Todo properties missing.",
    });

    return;
  }

  const todoJson = fs.readFileSync(__dirname + "/data/todos.json", "utf8");
  const todos = JSON.parse(todoJson);

  // Get the id of this new todo
  const nextIdJson = fs.readFileSync(__dirname + "/data/next-ids.json", "utf8");
  const nextIdData = JSON.parse(nextIdJson);

  // Create the todo w/ new id and completed marked as false
  const todo = {
    id: nextIdData.nextTodoId,
    userid: userid,
    category: category,
    description: description,
    deadline: deadline,
    priority: priority,
    completed: false,
  };

  nextIdData.nextTodoId += 1;
  fs.writeFileSync(
    __dirname + "/data/next-ids.json",
    JSON.stringify(nextIdData)
  );

  todos.push(todo);
  fs.writeFileSync(__dirname + "/data/todos.json", JSON.stringify(todos));

  // LOG data for tracing
  console.info("LOG: New todo added is ->", todo);

  response.status(201).json(todo);
});

// PUT a todo in order to toggle the "completed" field (false->true initially)
app.put("/api/todos/:id", function (request, response) {
  const requestedId = request.params.id;
  console.info(
    `LOG: Got a PUT request to toggle todo ${requestedId} as complete`
  );

  const json = fs.readFileSync(__dirname + "/data/todos.json", "utf8");
  const todos = JSON.parse(json);

  // Find the requested todo
  const matchingTodo = todos.find(
    (todo) => String(todo.id) === String(requestedId)
  );

  // If todo not found, we have nothing left to do: respond
  if (!matchingTodo) {
    console.warn("LOG: **ERROR: todo does not exist!");
    response.status(404).end();

    return;
  }

  // Mark the todo complete if is incomplete, and vice versa
  // This will correctly mutate the "todos" array, before rewriting file
  matchingTodo.completed = !matchingTodo.completed;
  fs.writeFileSync(__dirname + "/data/todos.json", JSON.stringify(todos));

  // LOG data for tracing
  console.info("LOG: This todo is complete ->", matchingTodo);

  response.status(200).json({
    id: matchingTodo.id,
    completed: matchingTodo.completed,
  });
});

// DELETE a todo by id
app.delete("/api/todos/:id", function (request, response) {
  const requestedId = request.params.id;
  console.info("LOG: Got a DELETE request for todo", requestedId);

  const json = fs.readFileSync(__dirname + "/data/todos.json", "utf8");
  let todos = JSON.parse(json);

  // Find the index of the requested todo
  const index = todos.findIndex(
    (todo) => String(todo.id) === String(requestedId)
  );

  // If todo not found, respond with 404
  if (index === -1) {
    response.status(404).json({ error: "Todo not found" });
    return;
  }

  // Remove the todo from the array
  todos.splice(index, 1);

  // Write the updated todos array to the file
  fs.writeFileSync(__dirname + "/data/todos.json", JSON.stringify(todos));

  // LOG data for tracing
  console.info("LOG: Deleted todo with id", requestedId);

  response.status(204).end();
});

// POST a new user
app.post("/api/users", function (req, res) {
  console.info("LOG: Got a POST request to add a user");
  console.info("LOG: Message body -------->", JSON.stringify(req.body));

  // If not all user data passed, reject the request
  if (!req.body.name || !req.body.username || !req.body.password) {
    console.warn("LOG: **MISSING DATA**: one or more user properties missing");
    return res.status(400).json({
      error:
        "Missing data, can't process: one or more User properties missing.",
    });
  }

  const json = fs.readFileSync(__dirname + "/data/users.json", "utf8");
  const users = JSON.parse(json);

  // Check for duplicate username
  const byUsername = (user) =>
    user.username.toLowerCase() === req.body.username.toLowerCase();
  const matchingUser = users.find(byUsername);

  // If username already exists, return 403
  if (matchingUser !== undefined) {
    console.warn("LOG: **ERROR: username already exists!");
    return res
      .status(403)
      .json({ error: "Forbidden: Username already exists!" });
  }

  const user = {
    id: users.length + 1,
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    profilePicUrl: req.body.profilePicUrl || "uploads/default.png",
  };

  users.push(user);
  fs.writeFileSync(__dirname + "/data/users.json", JSON.stringify(users));

  // LOG data for tracing
  console.info("LOG: New user added is ->", user);

  return res.status(201).json(user);
});
app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname + "/pages/login.html"));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const json = fs.readFileSync(__dirname + "/data/users.json", "utf8");
  const users = JSON.parse(json);
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res
      .status(200)
      .json({ message: "Login successful", username: user.username });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

app.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logout successful" });
});

///////////////////////////////////////////////////////////////////////
// Start the server ///////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

const server = app.listen(8083, () => {
  const port = server.address().port;
  console.info("App listening at port", port);
});
