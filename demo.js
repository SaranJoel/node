const express = require("express");
const bodyparse = require("bady-parser");
const app = express();

app.use(express.json());

const subjects = [
  { id: 1, name: "subject1" },
  { id: 2, name: "subject2" },
  { id: 3, name: "subject3" },
];

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/api/subjects", function (req, res) {
  res.send(subjects);
});
app.get("/api/subjects/:id", function (req, res) {
  const subject = subjects.find((c) => c.id === parseInt(req.params.id));
  if (!subject) return res.status(400).send("the subject does not exist!");
  res.send(subject);
});

app.post("/api/subjects", function (req, res) {
  //validation
  if (!req.body.name || req.body.name.length < 3)
    return res.status(400).send("Subject is invalid, enter agian!");

  const subject = {
    id: subjects.length + 1,
    name: req.body.name,
  };

  subjects.push(subject);
  res.send(subjects);
});

app.put("/api/subject/:id", function (req, res) {
  //validation
  const subject = subject.find((c) => c.id === parseInt(req.params.id));
});

const port = 500;
app.listen(port, function () {
  console.log("we are connected");
});
