const express = require("express");
const app = express();
const patientData = require("./data");

app.use(express.json());

//get the patient data
app.get("/", (req, res) => {
  res.send(patientData);
});

//get details of spcific patiet
app.get("/getPatient/:name", (req, res) => {
  const patientname = patientData.find((c) => c.name === req.params.name);
  if (!patientname) return res.status(404).send("please provide correct name");

  res.send(patientname);
});

//add patient using post
app.post("/addPatient", (req, res) => {
  if (
    !req.body.name ||
    !req.body.age ||
    !req.body.gender ||
    !req.body.diagnosis ||
    !req.body.temperature ||
    !req.body.bloodPressure ||
    !req.body.heartrate
  )
    return res
      .status(400)
      .send(
        "please all the details name, age, gender, diagnosis, temp, bloodpressure and heartrate"
      );

  patientData.push(req.body);
  res.send(patientData);
});

//for update the patient details we use put
app.put("/updatePatient/:name", (req, res) => {
  const pname = req.params.name;
  const newdata = req.body;
  const patIndex = patientData.findIndex((c) => c.name === pname);
  if (patIndex === -1)
    return res.status(400).send("provide valid name to update");

  patientData[patIndex] = {
    ...patientData[patIndex],
    ...newdata,
  };

  res.send(patientData);
});

//delete a patient, done using delete
app.delete("/deletePatient/:name", (req, res) => {
  const patname = req.params.name;
  const patientindex = patientData.findIndex((c) => c.name === patname);
  const patientName = patientData.find((c) => c.name === patname);
  if (!patientName || patname === -1)
    return res.status(404).send("provide valid name to delete");

  patientData.splice(patientindex, 1);
  res.send(patientData);
});

const PORT = 1900;
app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
