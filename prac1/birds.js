const express = require("express");
const app = express();

app.use(express.json());

const birds = [
  {
    bird: "owl",
    speed: "120km/hr",
    nickname: "nighthunter",
  },
  {
    bird: "raven",
    speed: "100km/hr",
    nickname: "death",
  },
  {
    bird: "eagle",
    speed: "200km/hr",
    nickname: "rulerofsky",
  },
];

app.get("/", (req, res) => {
  res.send(birds);
});

//for specific bird
app.get("/bird/:bird", (req, res) => {
  const reqbird = birds.find((c) => c.bird === req.params.bird);
  if (!reqbird) return res.status(404).send("provide correct bird name");

  res.send(reqbird);
});

app.post("/addbird", (req, res) => {
  if (!req.body.bird || !req.body.speed || !req.body.nickname)
    return res.status(400).send("provide bird, speed and nickname as well");

  const newdata = req.body;
  birds.push(newdata);
  res.send(birds);
});

app.put("/updatebird/:bird", (req, res) => {
  const birdname = req.params.bird;
  const newbirddata = req.body;
  const birdIndex = birds.findIndex((c) => c.bird === birdname);

  if (birdIndex === -1)
    return res.status(404).send("provide valid bird name to change");

  birds[birdIndex] = {
    ...birds[birdIndex],
    ...newbirddata,
  };

  res.send(birds);
});

//delete
app.delete("/delete/:bird", (req, res) => {
  const birde = req.params.bird;
  const birdeindex = birds.findIndex((c) => c.bird === birde);
  if (birdeindex === -1)
    return res.status(404).send("provide valid birde name to remove");

  birds.splice(birdeindex, 1);
  res.send(birds);
});
const PORT = 1009;
app.listen(PORT, () => {
  console.log("server is running at 1009");
});
