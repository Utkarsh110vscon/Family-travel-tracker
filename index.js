import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "userdata_storage",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

// let users = [
//   { id: 1, name: "Angela", color: "teal" },
//   { id: 2, name: "Jack", color: "powderblue" },
// ];
let users= [];

async function getUserData() {
  const result= await db.query("SELECT id, name, color FROM users");
  // console.log(result);
  return result.rows;
}

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries WHERE user_id = $1", [currentUserId]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function findIndex(arr) {
  let index=arr.findIndex(ele => ele.id == currentUserId)
  return index;
}

app.get("/", async (req, res) => {
  users= await getUserData();
  // console.log(users);

  const countries = await checkVisisted();
  // console.log(countries);
  const index= await findIndex(users);

  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: users[index].color,
    btnColor: "teal"
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    // console.log(data);
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
      const countries = await checkVisisted();
      res.render("index.ejs", {
        countries : countries,
        total: countries.length,
        users: users,
        color: "teal",
        error: "Country already added",
      });

    }
  } catch (err) {
    console.log(err);
    const countries = await checkVisisted();
      res.render("index.ejs", {
        countries : countries,
        total: countries.length,
        users: users,
        color: "teal",
        error: "Country not found",
      });
  }
});
app.post("/user", async (req, res) => {
  // console.log(req.body.user);
  if(req.body.user){
    currentUserId=req.body.user;
    res.redirect("/");
  }else{
    res.render(req.body.add+".ejs");
  }
  
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  // console.log(req.body);
  const result=await db.query
  ("INSERT INTO users (name, color) VALUES ($1, $2) RETURNING id", [req.body.name, req.body.color]);
  // console.log(result);
  currentUserId=result.rows[0].id;
  // console.log(currentUserId);
  res.redirect("/");

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
