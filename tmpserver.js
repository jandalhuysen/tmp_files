const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");

const app = express();

const port = 5000;

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set("view engine", "ejs");

let users = 0;

app.post("/signup", urlencodedParser, function (req, res) {
  let name = req.body.name;
  let surname = req.body.surname;
  if (name == "") {
    res.render("error_no_name");
  }
  if (surname == "") {
    res.render("error_no_surname");
  }
  if (name.length == 1) {
    res.render("error_name_length");
  }
  if (surname.length == 1) {
    res.render("error_surname_length");
  }
  if (name != "" && surname != "") {
    users = users + 1;
    res.send(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://jandalhuysen.github.io/tailwindcss.js"></script>
    <title>Success</title>
  </head>
  <body>
    <div class="flex justify-center h-screen bg-gray-800">
      <div class="bg-gray-900 h-1/4 w-1/2 mt-12">
        <div>
          <p
            class="flex font-mono font-family: consolas text-blue-300 justify-center py-6"
          >
            Welcome, ${name}!
          </p>
        </div>
        <div>
          <p
            class="flex font-mono font-family: consolas text-blue-300 justify-center py-6"
          >
            You successfully signed up!
          </p>
        </div>
        <div>
          <p
            class="flex font-mono font-family: consolas text-blue-300 justify-center py-6"
          >
            You can now visit the
            <a
              class="font-mono font-family: consolas text-white hover:text-gray-300"
              href="http://localhost:5000/home"
            >
              &nbspHome&nbsp</a
            >page.
          </p>
        </div>
      </div>
    </div>
  </body>
</html>
`);
    fs.writeFile(
      `user${users}.json`,
      `[{ "name": "${name}", "surname": "${surname}" }]`,
      function (err) {
        if (err) throw err;
        console.log("File is created successfully.");
      }
    );
  }
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/car", (req, res) => {
  let number = Math.floor(Math.random() * 10);
  let file = "car" + number + ".json";
  res.sendFile(__dirname + "/" + file);
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/server.png", (req, res) => {
  res.sendFile(__dirname + "/100server.png");
});

app.listen(port, () => console.log(`http://localhost:${port}`));
