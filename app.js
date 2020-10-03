const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const mongoose = require("mongoose");

const app = express();

const jsonParser = bodyParser.json();

app.use("/api/auth", jsonParser, require("./routes/auth.routes"));

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
  } catch (e) {
    console.log("Server error", e.message);
    process.exit(1);
  }
}

start();
