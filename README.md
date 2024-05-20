Here is a detailed README file for the Family travel tracker project:

# 8.3-travel-tracker

## Description
A travel tracker application built with Node.js, Express, PostgreSQL, and EJS. This application allows users to keep track of the countries they have visited and display the information dynamically.

## Installation

### Prerequisites
- Node.js (v12.x or higher)
- PostgreSQL (v10.x or higher)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/8.3-travel-tracker.git
   cd 8.3-travel-tracker
### Install the necessary dependencies:
npm install

### Set up your PostgreSQL database:

Create a PostgreSQL database named world.
Create the necessary tables:

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  color VARCHAR(255) NOT NULL
);

CREATE TABLE countries (
  id SERIAL PRIMARY KEY,
  country_name VARCHAR(255) NOT NULL,
  country_code VARCHAR(10) NOT NULL
);

CREATE TABLE visited_countries (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  country_code VARCHAR(10) REFERENCES countries(country_code)
);

### Update the database connection information in index.js:


const db = new pg.Client({
  user: "your_postgres_username",
  host: "localhost",
  database: "world",
  password: "your_postgres_password",
  port: 5432,
});

### Usage
To start the server, run:
node index.js

### The server will be running on http://localhost:3000.

### Endpoints
GET / - Renders the main page with the list of countries visited by the current user.
POST /add - Adds a country to the list of visited countries for the current user.
POST /user - Changes the current user or renders a new user form.
POST /new - Adds a new user to the database and sets them as the current user.

### Project Structure
index.js: Main server file containing the application logic.
package.json: Project metadata and dependencies.
package-lock.json: Dependency lock file.

### Dependencies
express: ^4.18.2
body-parser: ^1.20.2
ejs: ^3.1.9
pg: ^8.11.3

###Development
To contribute to this project:

### Fork the repository.
Create a new branch:

 git checkout -b feature/your-feature-name
Make your changes and commit them:

 git commit -m "Add some feature"
Push to the branch:

 git push origin feature/your-feature-name
Open a pull request to the main branch.

Contact
For any questions or suggestions, please open an issue or contact me at [uk10234567@gmail.com].
