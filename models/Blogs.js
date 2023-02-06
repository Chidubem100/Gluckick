var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		maxlength: 50,	
	},
	body: {
		type: String,
		required: true
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true
	}
},{timestamps: true});


module.exports = mongoose.model("Blog", blogSchema);