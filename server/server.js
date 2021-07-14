const express = require("express");
const cors = require("cors");

// Database
const db = require("./app/config/db.config.js");
const authorizer = require("./app/middlewares/auth.middleware.js");

require("dotenv").config();

db.authenticate()
  .then(() => {
    console.log("Database connected ...");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// console.log(app)

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/auth", require("./app/routes/Auth.routes.js"));
app.use(authorizer)
app.use("/work", require("./app/routes/Work.routes.js"));

app.get("/", (request, response) => response.send("YOUR ARE AT ROOT"));
const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server has started on port ${PORT}`));
