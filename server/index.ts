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
      "chrome-extension://hoohflakhgeopodfhmolbnbonaccfllj",
      "http://localhost:5000",
    ],
  })
);

app.use(bodyParser.json({ limit: "200mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use("/api", require("./src/routes"));

// app.post("/api/extension/storedata", (req, res) => {
//   console.log(req.body);
//   const { url, pageContent, email, screenshot } = req.body;
//   // decode base64 image to file
//   const base64Data = screenshot.replace(/^data:image\/png;base64,/, "");
//   fs.writeFileSync("screenshot.png", base64Data, "base64");
//   // save page content to file
//   fs.writeFileSync("pageContent.txt", pageContent);

//   res.json({ message: "Data received successfully" });
// });

// app.post("/api/siteVisited", (req, res) => {
//   console.log(req.body);
//   res.json({ message: "Site visited data received successfully" });
// });

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
