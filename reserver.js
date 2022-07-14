const fs = require("fs");
const express = require("express");
const body_parser = require("body-parser");
const fetch = require("node-fetch");
const os = require("os");

const app = express();
const port = 5000;

var url_encoded_parser = body_parser.urlencoded({ extended: false });
var data = fs.readFileSync("words.json");
var words = JSON.parse(data);
console.log(words);

app.set("view engine", "ejs");

app.get("/mycomputer", (req, res) => {
  console.log("Architecture: " + os.arch());
  console.log("CPUs: " + os.cpus());
  console.log("Endianness: " + os.endianness());
  console.log("Free memory: " + os.freemem());
  console.log("Hostname: " + os.hostname());
  console.log("Load averages: " + os.arch());
  console.log("Network interfaces: " + os.networkInterfaces());
  console.log("Operating system's platform: " + os.platform());
  console.log("Operating system's release: " + os.release());
  console.log("Default directory for temporary files: " + os.tmpdir());
  console.log("Total memory: " + os.totalmem());
  console.log("Operating system: " + os.type());
  console.log("Uptime: " + os.uptime());
  console.log("User information: " + os.userInfo());
  res.send({
    Architecture: `${os.arch()}`,
    CPUs: `${os.cpus()}`,
    Endianness: `${os.endianness()}`,
    "Free memory": `${os.freemem()}`,
    Hostname: `${os.hostname()}`,
    "Load averages": `${os.arch()}`,
    "Network interfaces": `${os.networkInterfaces()}`,
    "Operating system's platform": `${os.platform()}`,
    "Operating system's release": `${os.release()}`,
    "Default directory for temporary files": `${os.tmpdir()}`,
    "Total memory": `${os.totalmem()}`,
    "Operating system": `${os.type()}`,
    Uptime: `${os.uptime()}`,
    "User information": `${os.userInfo()}`,
  });
});

app.get("/weersien", (req, res) => {
  res.sendFile(__dirname + "/words.json");
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/home", (req, res) => {
  // res.render("home");
  async function test() {
    let data = await fetch("http://localhost:5000/add/server/100");
    console.log(data);
  }
  test();
  res.send(`${Date.now()}`);
});

app.get("/weer/:temp", (req, res) => {
  let data = req.params;
  let temp = data.temp;
  const d = new Date();
  let time =
    d.getFullYear().toString() +
    "-" +
    d.getMonth().toString() +
    "-" +
    d.getDate().toString() +
    " " +
    d.getHours() +
    ":" +
    d.getMinutes();
  console.log(time);
  async function addData() {
    let tmp = await fetch(`http://localhost:5000/add/${time}/${temp}`);
  }
  addData();
  res.send({ status: "success" });
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", url_encoded_parser, function (req, res) {
  let name = req.body.name;
  let surname = req.body.surname;
  res.send(
    `<h1>Welcome ${name}</h1><p>We hope you enjoy your stay, ${name} ${surname}`
  );
  fs.writeFile(
    `${name}.json`,
    `[{ "name": "${name}", "surname": "${surname}" }]`,
    function (err) {
      if (err) throw err;
    }
  );
});

app.get("/add/:word/:score?", addWord);

function addWord(req, res) {
  let data = req.params;
  let word = data.word;
  let score = Number(data.score);
  words[word] = score;
  console.log(words);
  let stringed = JSON.stringify(words, null, 2);
  fs.writeFile("words.json", stringed, done);
  function done() {
    console.log("done");
  }
  res.send({ message: "epic" });
}

app.listen(port, listening);

function listening() {
  console.log(`Listening on http://localhost:${port}`);
}
