const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var cors = require("cors");
const helmet = require("helmet");
const authRoute = require("./controllers/auth.controller");

dotenv.config();
const port = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) {
    console.log(err);
  } else console.log("Connected to MongoDB");
});

//middleware
app.use(cors())
app.use(express.json());
app.use(helmet());

app.use("/api/userData", authRoute);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
