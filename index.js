const express = require("express");
const dotenv = require("dotenv");

const routes = require("./src/routes");

dotenv.config();

const app = express();

const port = process.env.SERVER_PORT;

// Consist All End Points
app.use("/", routes);

app.listen(port, () => {
  console.log(`server Started on http://localhost:${port}`);
});
