const expressApp = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = expressApp();
const dotenv = require("dotenv");
dotenv.config();

app.use(
  cors({
    origin: [
      "chrome-extension://pmjbcolldgmnllngnljdnaogplellknc",
      "http://localhost:5000",
    ],
  })
);

app.use(bodyParser.json({ limit: "200mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use("/api", require("./src/routes"));

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
