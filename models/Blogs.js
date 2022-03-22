var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
	title: "string",
	body: "string",
	created: {type: Date, default: Date.now}
});





module.exports = mongoose.model("Blog", blogSchema);