const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();

const app = express();

//Use helmet to prevent common security vulnerabilities
app.use(helmet());

//Use body-parser to parse json body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, auth-token"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(cors());

app.use("/api/v1/summarize", require("./api/routes/summarize"));

//This function will give a 404 response if an undefined API endpoint is fired
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const PORT = process.env.PORT || 3000;

//Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
