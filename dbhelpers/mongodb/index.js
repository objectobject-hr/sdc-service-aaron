const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/awayhome", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, `connection error: `));
db.once("open", () => console.log(`we're connected to  m o s t l y   k e y s`));

module.exports = db;
