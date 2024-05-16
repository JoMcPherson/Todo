###

# Stay Organized Workshop Server

This is intended to be the backend for the Stay Organized workshop.

## Setup this server locally

- Clone this repository to your local computer.

  ```bash
    git clone https://github.com/JoMcPherson/Todo
  ```

- Change directories (`cd`) into the newly cloned project folder.

  ```bash
    cd stay-organized-workshop-express-server
  ```

- Install the projects dependencies with NPM (Node Package Manager).

  ```bash
    npm install
  ```

- Start the local server

  **Command to start the server**

  ```
    npm start
  ```

  **Expected Output**

  ```bash
    App listening at port 8083
  ```

- Verify the server is working as expected by acessing http://localhost:8083/api/users

  **Expected output from URL**

  ```js
  [
    {
      id: 1,
      name: "Vito Corleone",
      username: "gamer04",
      password: "gamer04!",
      profilePicUrl: "uploads/default.png",
    },
    {
      id: 2,
      name: "Michael Corleone",
      username: "cheer",
      password: "Cheer",
      profilePicUrl: "uploads/michael.png",
    },
    {
      id: 3,
      name: "Tony Montana",
      username: "farmgirl",
      password: "smartKid",
      profilePicUrl: "uploads/default.png",
    },
    {
      id: 4,
      name: "Tom Hagen",
      username: "corndog",
      password: "corn!dog",
      profilePicUrl: "uploads/default.png",
    },
    {
      id: 5,
      name: "Sonny Corleone",
      username: "theaterkid",
      password: "!theaterkid!",
      profilePicUrl: "uploads/default.png",
    },
    {
      id: 6,
      name: "Al Capone",
      username: "gamer05",
      password: "gamer05!",
      profilePicUrl: "uploads/default.png",
    },
    {
      id: 7,
      name: "Kay Adams",
      username: "betty812",
      password: "not_telling_you",
      profilePicUrl: "uploads/default.png",
    },
    {
      id: 8,
      name: "Angelo Bruno",
      username: "dudebro",
      password: "EPIC!!!27",
      profilePicUrl: "uploads/default.png",
    },
    {
      id: 9,
      name: "Gus Fring",
      username: "joannamcpherson101",
      password: "test",
      profilePicUrl: "uploads/default.png",
    },
    {
      id: 10,
      name: "Rico Bandello",
      username: "mmcpher",
      password: "test",
      profilePicUrl: "uploads/default.png",
    },
    {
      id: 11,
      name: "Santino 'Sonny' Corleone",
      username: "honkytonk",
      password: "test",
      profilePicUrl: "uploads/default.png",
    },
    {
      id: 12,
      name: "Karen Hill",
      username: "tester",
      password: "test",
      profilePicUrl: "uploads/default.png",
    },
    {
      id: 13,
      name: "Joe Pesci",
      username: "pfredman",
      password: "test",
      profilePicUrl: "uploads/default.png",
    },
    {
      id: 14,
      name: "Paul Cicero",
      username: "pfreddyman",
      password: "test",
      profilePicUrl: "uploads/default.png",
    },
    {
      id: 15,
      name: "Benjamin 'Lefty' Ruggiero",
      username: "dparton",
      password: "test",
      profilePicUrl: "uploads/default.png",
    },
    {
      id: 16,
      name: "Henry Hill",
      username: "COBRIEN",
      password: "test",
      profilePicUrl: "uploads/default.png",
    },
    {
      id: 17,
      name: "Eddie Valiant",
      username: "LIU",
      password: "TEST",
      profilePicUrl: "uploads/default.png",
    },
    {
      id: 18,
      name: "Scarface",
      username: "dylan",
      password: "test",
      profilePicUrl: "uploads/default.png",
    },
    {
      id: 19,
      name: "Sal Tessio",
      username: "flast",
      password: "test",
      profilePicUrl: "uploads/default.png",
    },
    {
      id: 20,
      name: "Dominic Toretto",
      username: "lala",
      password: "lala",
      profilePicUrl: "uploads/default.png",
    },
  ];
  ```

## Technology Used

This web application uses HTML, CSS, Bootstrap, JavaScript, and an Express server. In HTML, the structure of the website is defined and links to JS,CSS and Bootstrap for displaying content. CSS and Bootstrap are utilized for styling the webpage, ensuring a visually appealing layout using classes like card, col-md-4, and btn. JavaScript handles dynamic behavior such as fetching data from APIs (fetch), updating the UI based on user interactions (addEventListener), and manipulating the DOM (innerHTML, createElement). The Express server, configured with middleware like express, cors, and path, serves static files, handles API endpoints (GET requests for different pages), and provides routes for frontend navigation. Overall, this setup enables a responsive and interactive web experience, combining frontend technologies with a backend server for data handling and routing.

## Home Page

![Home Page](/images/home.png)

---

## Add a To Do Page

![Add a To Do Page](/images/new_todo.png)

---

## View To Do Pages

![To Do Page](/images/to_do.png)

## Register New User

---

![Register Page](/images/register.png)

## References

### [How to Upload Files in Node.js Using Express and Multer](https://www.youtube.com/watch?v=i8yxx6V9UdM)
