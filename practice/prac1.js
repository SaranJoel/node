// required(express) --> it imports the express library
const express = require("express");
const app = express(); /// ---> this line creates an express application

app.use(express.json()); // ----> this line tells express to understand json in request body
//If you send { "name": "Math" } to your API, this line makes it readable in req.body.

const people = [
  { id: 1, name: "Saran" },
  { id: 2, name: "Joel" },
  { id: 3, name: "Eryndor" },
];

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.get("/people/:id", (req, res) => {
  const ppl = people.find((c) => c.id === parseInt(req.params.id));
  if (!ppl) return res.status(404).send("This person have no ID, check the ID");
  res.send(ppl);
});

app.post("/api/people", (req, res) => {
  if (!req.body.name || req.body.name.length < 3)
    // this is to check weather there is anything in the request bodyi.e. the json we gave in postman, this code checks an dgives error
    return res //400 -> says it is error from the client side
      .status(400)
      .send("Please send the Correct Details for the person");

  const ppl = {
    // if the above fails, then we have to add the name to the array.
    id: people.length + 1,
    name: req.body.name,
  };
  people.push(ppl); //push the id, name into the array
  res.send(people);
});

app.put("/api/people/:id", (req, res) => {
  const ppl = people.find((c) => c.id === parseInt(req.params.id));
  if (!ppl) return req.status(404).send("it is not the correct ID");

  if (!req.body.name || req.body.name.length < 3)
    return req.status(400).send("Enter new name for the id");

  ppl.name = req.body.name;

  //people.push(ppl);
  res.send(people);
});

app.delete("/api/people/:id", (req, res) => {
  const ppl = people.find((c) => c.id === parseInt(req.params.id));
  if (!ppl) return req.status(404).send("there is no ppl with that id");

  const forDelete = people.indexOf(ppl);
  people.splice(forDelete, 1);
  res.send(people);
});

const PORT = 1928;
app.listen(PORT, () => {
  console.log(`server is running in the port ${PORT}`);
});

// 🧾 400 Bad Request
// You submitted a form but left the "name" field empty.
// The server says: “❌ This form is filled incorrectly.”

// 🚫 404 Not Found
// You try to access /subjects/99 but subject 99 doesn’t exist.
// The server says: “❌ I don’t have that resource.”
