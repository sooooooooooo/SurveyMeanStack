const mongoose = require("mongoose");
const User = require("./user");
const Schema = mongoose.Schema;

const PollSchema = new mongoose.Schema({
	question: {
		type: String,
		required: [true, "Question field is required"],
		minlength: [8, "Question must be at least 8 characters"]
	},
	option1: {
		type: String,
		required: [true, "Option 1 field is required"],
		minlength: [3, "Option 1 must be at least 3 characters"]
	},
	option2: {
		type: String,
		required: [true, "Option 2 field is required"],
		minlength: [3, "Option 2 must be at least 3 characters"]
	},
	option3: {
		type: String,
		required: [true, "Option 3 field is required"],
		minlength: [3, "Option 3 must be at least 3 characters"]
	},
	option4: {
		type: String,
		required: [true, "Option 4 field is required"],
		minlength: [3, "Option 4 must be at least 3 characters"]
	},
	vote1: {
		type: Number,
		default: 0
	},
	vote2: {
		type: Number,
		default: 0
	},
	vote3: {
		type: Number,
		default: 0
	},
	vote4: {
		type: Number,
		default: 0
	},
	_user: {
		type: Schema.Types.ObjectId, 
  		ref: 'User'
	}
}, {timestamps: true});

const Poll = mongoose.model("Poll", PollSchema);

module.exports = {
	Poll: Poll,
	PollSchema: PollSchema
};