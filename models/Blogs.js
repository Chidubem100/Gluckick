var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true,'Title is required'],
		maxlength: 50,	
	},
	body: {
		type: String,
		required: [true, 'Title is required']
	},
	// user: {
	// 	type: mongoose.Schema.ObjectId,
	// 	ref: 'User',
	// 	required: true
	// },
	// createdBy: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // }
},{timestamps: true});


module.exports = mongoose.model("Blog", blogSchema);