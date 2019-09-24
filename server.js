const express = require("express"),
app = express(),
mongoose = require("./config/dbconnection"),
port = 8000;

app.use(express.static(__dirname + "/public/dist/public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

require("./config/routes")(app);

app.listen(port, () => console.log(`Server listening on port ${port}`));