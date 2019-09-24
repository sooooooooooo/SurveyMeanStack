const myCtrl = require("../controllers/main_controller");
const path = require("path");

module.exports = (app) => {
	app.get("/users", myCtrl.readAllUsers);
	app.get("/users/:name", myCtrl.readOneUser);
	app.post("/users", myCtrl.createUser);
	app.post("/users/:id/surveys", myCtrl.createSurvey);
	app.get("/surveys", myCtrl.readAllSurveys);
	app.get("/surveys/:id", myCtrl.readOneSurvey);
	app.put("/surveys/:sid/:oid", myCtrl.upVote);
	app.delete("/surveys/:sid", myCtrl.destroySurvey);
	app.all("*", (req, res, next) => {
		res.sendFile(path.resolve("./public/dist/public/index.html"))
	});
}