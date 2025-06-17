const express = require("express");
const app = express();

app.use(express.json());

const animals = [
  { id: 1, name: "Tiger" },
  { id: 2, name: "owl" },
  { id: 3, name: "crow" },
  { id: 4, name: "wolf" },
  { id: 5, name: "fox" },
];

/// req => request
/// res => response
app.get("/", (req, res) => {
  res.send(animals);
});

//get the animal by id
app.get("/animal/:id", (req, res) => {
  const animal = animals.find((c) => c.id === parseInt(req.params.id));
  if (!animal) return res.status(404).send("Provide valid Id");
  res.send(animal);
});

//post request
app.post("/api/animal", (req, res) => {
  if (!req.body.name || req.body.name.length < 3)
    return res.status(400).send("there is error in the name you are providing");

  const animal = {
    id: animals.length + 1,
    name: req.body.name,
  };
  animals.push(animal);
  res.send(animals);
});

//put
app.put("/api/animal/:id", (req, res) => {
  const animal = animals.find((c) => c.id === parseInt(req.params.id));
  if (!animal) return res.send(404).send("provide valid ID");

  if (!req.body.name || req.body.name.length < 3)
    return res.status(400).send("provide valid name");

  animal.name = req.body.name;
  //res.send(animal);
  res.send(animals);
});

app.delete("/api/animal/:id", (req, res) => {
  const animal = animals.find((c) => c.id === parseInt(req.params.id));
  if (!animal) return res.status(404).send("Given id should eb valid");

  const forDelete = animals.indexOf(animal);
  animals.splice(forDelete, 1);
  res.send(animals);
});
const PORT = 1782;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
