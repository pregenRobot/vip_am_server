const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

// Database
const db = require("./app/config/db.config.js");

db.authenticate()
    .then(() => { console.log("Database connected ...") })
    .catch(err => { console.log("Error" + err) })

const app = express();

app.get("/", (request, response) => response.send("YOUR ARE AT ROOT"));

app.use("/work", require("./app/routes/Work.routes.js"))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server has started on port ${PORT}`));