const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/", userRoutes);
app.use("/addUser", userRoutes);
app.use("/deleteUser", userRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
