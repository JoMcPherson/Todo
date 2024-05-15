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
    { id: 1, name: "Dolly Parton", username: "gamer04" },
    { id: 2, name: "Troye Sivan", username: "cheer" },
    { id: 3, name: "Chapell Roan", username: "farmgirl" },
    { id: 4, name: "Maude Lator", username: "corndog" },
    { id: 5, name: "King Princess", username: "theaterkid" },
    { id: 6, name: "Hozier", username: "gamer05" },
    { id: 7, name: "Kacey Musgraves", username: "betty812" },
    { id: 8, name: "Anderson East", username: "dudebro" },
    { id: 9, name: "George Ezra", username: "joannamcpherson101" },
    { id: 10, name: "Rihanna", username: "mmcpher" },
    { id: 11, name: "Suki Waterhouse", username: "honkytonk" },
    { id: 12, name: "Katy Perry", username: "tester" },
    { id: 13, name: "John Legend", username: "pfredman" },
    { id: 14, name: "Paris Hilton", username: "pfreddyman" },
    { id: 15, name: "Billie Eilish", username: "dparton" },
    { id: 16, name: "Harry Styles", username: "COBRIEN" },
    { id: 17, name: "Elton John", username: "LIU" },
    { id: 18, name: "Adele", username: "dylan" },
    { id: 19, name: "Sam Smith", username: "flast" },
    { id: 20, name: "Dua Lipa", username: "lala" },
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
