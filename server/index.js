const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(
  cors({
    origin: [
      "chrome-extension://hoohflakhgeopodfhmolbnbonaccfllj",
      "http://localhost:5000",
    ],
  })
);

// Add body parser middleware
app.use(express.json({ limit: "200mb" }));
app.use(bodyParser.json({ limit: "200mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.post("/api/data", (req, res) => {
  console.log(req.body);
  res.json({ message: "Data received successfully" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
