const User = require("../models/user"),
Poll = require("../models/poll").Poll;

module.exports = {
	readAllUsers: (req, res) => {
		User.find()
		.then(allUsers => res.json({message: "Success", allUsers}))
		.catch(err => res.json(err))
	},
	readOneUser: (req, res) => {
		const {name} = req.params;
		User.findOne({name: name})
		.then(oneUser => res.json(oneUser))
		.catch(err => res.json(err))
	},
	createUser: (req, res) => {
		const user = new User()
		user.name = req.body.name
		user.save()
		.then(newUser => res.json(newUser))
		.catch(err => res.json(err))
	},
	createSurvey: (req, res) => {
		const {id} = req.params;
		const poll = new Poll()
		poll.question = req.body.question
		poll.option1 = req.body.option1
		poll.option2 = req.body.option2
		poll.option3 = req.body.option3
		poll.option4 = req.body.option4
		poll._user = id
		poll.save()
		.then(newPoll => {
			User.findOne({_id: id})
			.then(thisUser => {
				thisUser.polls.push(newPoll)
				thisUser.save()
				res.json(thisUser)
			})
			.catch(err => res.json(err))
		})
		.catch(err => res.json(err))
	},
	readAllSurveys: (req, res) => {
		Poll.find()
		.then(allSurveys => res.json(allSurveys))
		.catch(err => res.json(err))
	},
	readOneSurvey: (req, res) => {
		const {id} = req.params;
		Poll.findOne({_id: id})
		.then(oneSurvey => res.json(oneSurvey))
		.catch(err => res.json(err))
	},
	upVote: (req, res) => {
		const {sid} = req.params
		const {oid} = req.params
		const thisVote = `vote${oid}`
		Poll.findOne({_id: sid})
		.then(thisSurvey => {
			thisSurvey[thisVote] += 1;
			thisSurvey.save()
			.then(updatedSurvey => res.json(updatedSurvey))
			.catch(err => res.json(err))
		})
		.catch(err => res.json(err))
	},
	destroySurvey: (req, res) => {
		const {sid} = req.params
		Poll.findOne({_id: sid})
		.then(toBeDeletedSurvey => {
			toBeDeletedSurvey.remove()
			res.json(toBeDeletedSurvey)
		})
		.catch(err => res.json(err))
	}
};