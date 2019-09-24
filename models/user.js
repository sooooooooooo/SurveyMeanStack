const mongoose = require("mongoose");
const PollSchema = require("./poll").PollSchema;

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name field is required"]
	},
	polls: [PollSchema]
}, {timestamps: true});

const User = module.exports = mongoose.model("User", UserSchema);