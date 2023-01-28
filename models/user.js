var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({

	username: {
		type: String,
		required: [true, 'Please provide a valid username'],
		unique: true,
		maxLength: 20,
		trim: true
	},
	password: {
		type: String,
		minlength: 7,
		required: [true, 'Please provide a valid password not less than seven characters']
	},
	email: {
		type: String,
		required: [true, "Please provide a valide email"],
		unique: true,
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Please provide a valid email',
		],
	}
});









UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);