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

// app.use("/", async (req: any, res: any) => {
//   const response = await fetch("http://127.0.0.1:8000/health", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const data = await response.json();
//   console.log(data);
//   res.send(data);
// });

app.use("/api", require("./src/routes"));

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
