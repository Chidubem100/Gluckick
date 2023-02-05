const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please provide a valid username'],
		unique: true,
		maxLength: 20,
		trim: true
	},
	password: {
		type: String,
	},
	email: {
		type: String,
		required: [true, "Please provide a valid email"],
		unique: true,
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Please provide a valid email',
		],
	},
	role: {
		type: String,
		default: "user",
		enum: ["user","admin"],
		required: true
	}
	
});


userSchema.plugin(passportLocalMongoose);




module.exports = mongoose.model("User", userSchema);