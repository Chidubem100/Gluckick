const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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
		minlength: 6,
		required: [true, 'Please provide a valid password not less than seven characters']
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

// userSchema.pre('save', async function(){
// 	if(!this.isModified('password')) return;
// 	const salt = await bcrypt.genSalt(10);
// 	this.password = await bcrypt.hash(this.password, salt) 
// });

// userSchema.methods.comparePassword = async function (canditatePassword) {
// 	const isMatch = await bcrypt.compare(canditatePassword, this.password)
// 	return isMatch
// }
// userSchema.methods.createJwt = function(){
// 	return jwt.sign(
// 		{
// 			userId: this._id, username: this.username
// 		},
// 		'jbjhjjn',
// 		// process.env.JWT_SECRET,
// 		{
// 			expiresIn: '30d',
// 		}
// 	)
// }; 


module.exports = mongoose.model("User", userSchema);