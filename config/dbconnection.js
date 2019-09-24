const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/survey_db", {useNewUrlParser: true});
const db = mongoose.connection;

db.once("open", () => console.log("Connected to MongoDB"));
db.on("error", (error) => console.log(`DB error occurred: ${error}`));