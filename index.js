const express = require("express");
const dotenv = require("dotenv");
const admin = require("firebase-admin");
const credentials = require("./firbaseConfig.json");

const routes = require("./src/routes");

dotenv.config();

const app = express();

const port = process.env.SERVER_PORT;

// Consist All End Points
app.use("/", routes);

app.listen(port, () => {
  console.log(`server Started on http://localhost:${port}`);
});
