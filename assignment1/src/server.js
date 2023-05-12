const express = require("express");
const cors = require("cors");
const randomNumberGenerator = require("./services/random");
const generateFakeProfile = require("./services/genFakeProfile");

const app = express();

// Body parser middleware to get request body
app.use(express.json());

// CORS middleware to allow request
app.use(cors());

app.get("/api/v1/generator", (req, res) => {
  try {
    const start = +req.query.start;
    const end = +req.query.end;

    if ((!start && !end) || !start || !end) {
      throw new Error("Invalid Query Params!");
    }

    res.status(200).json({
      start,
      end,
      payload: randomNumberGenerator(start, end),
    });
  } catch (err) {
    res.status(422).json({
      message: err.message,
    });
  }
});

app.get("/api/v1/profile", (req, res) => {
  try {
    const { properties } = req.query;

    // Splitting the properties and mapping the items to return a brand new array
    const parameters = properties.split(",").map((item) => item.toLowerCase());
    if (!parameters.length > 0) throw new Error("Please select a parameter");

    // Sending back response with parameters and profile
    res.status(200).json({
      parameters,
      payload: generateFakeProfile(parameters),
    });
  } catch (err) {
    res.status(422).json({
      message: err.message,
    });
  }
});

app.get("/*", (req, res) => {
  res.status(200).json({
    message: "Server is running",
  });
});

// server listening on port 4000
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
