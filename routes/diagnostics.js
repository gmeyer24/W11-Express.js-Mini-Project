const diagnostics = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readAndAppend,
  readFromFile,
  writeToFile,
} = require("../helpers/fsUtils");

// GET Route for retrieving diagnostic information
diagnostics.get("/", (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  // res.json("Get Disagnostics"); test
  readFromFile("./db/diagnostics.json").then((data) =>
    res.json(JSON.parse(data))
  );
});

// POST Route for a error logging
diagnostics.post("/", (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  // res.json("Post Disagnostics"); test
  console.log(req.body);

  const { username, topic, tip } = req.body;

  if (req.body) {
    const newDiagnostic = {
      errors: {
        tip,
        topic,
        username,
      },
      error_id: uuidv4(),
      time: Date.now()
    };
    console.log(newDiagnostic);

    readAndAppend(newDiagnostic, "./db/diagnostics.json");
    res.json(`Diagnostic added successfully`);
  } else {
    res.error("Error in adding diagnostic");
  }
});

module.exports = diagnostics;
