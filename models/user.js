var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	username: "string",
	password: "string",
	email: "string"
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);