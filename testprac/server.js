const express = require("express");
const weather = require("./weatherdata");
const app = express();

app.use(express.json());

app.get("/allcities", (req, res) => {
  res.send(weather);
});

app.get("/getWeather/:city", (req, res) => {
  const cityWeather = weather.find((c) => c.city === req.params.city);
  if (!cityWeather)
    return res.status(404).send("provide the correct city name");

  res.send(cityWeather);
});

app.post("/addWeather", (req, res) => {
  const newData = req.body;
  if (!newData.city || !newData.country || !newData.humidity)
    return res
      .status(400)
      .send("Missing required fields: city, country, weather");

  weather.push(newData);
  res.send(weather);
});

app.put("/updateCity/:city", (req, res) => {
  const cityName = req.params.city;
  const updateData = req.body;
  const cityIndex = weather.findIndex((c) => c.city === cityName);
  if (cityIndex === -1)
    return res.status(404).send("provide correct city name");

  weather[cityIndex] = {
    ...weather[cityIndex], //✅ What is the Spread Operator in JavaScript?
    //The spread operator is written as ... (three dots), and it's used to "spread out" the properties of an object or elements of an array.
    ...updateData,
  };
  //   const obj1 = { a: 1, b: 2 };
  //   const obj2 = { ...obj1, c: 3 };

  //   console.log(obj2); // { a: 1, b: 2, c: 3 }

  res.send(weather);
});

app.delete("/delete/:city", (req, res) => {
  const cityName = req.params.city;
  const cityindex = weather.findIndex((c) => c.city === cityName);
  if (cityindex === -1)
    return res.status(404).send("provide correct city name to delete");

  weather.splice(cityindex, 1);
  res.send(weather);
});

const PORT = 1982;
app.listen(PORT, () => {
  console.log(`Server is running at Port ${PORT}`);
});
