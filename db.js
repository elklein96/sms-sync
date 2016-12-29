var mongoose = require('mongoose')
var Schema = mongoose.Schema, 
	ObjectId = Schema.ObjectId;

var db_url = process.env.MONGOHQ_URL || "mongodb://localhost:27017/test", 
    db = mongoose.connect(db_url);

var recordSchema = new Schema({
    id      : ObjectId,
    foo     : String,
    bar 	: String
});

var userSchema = new Schema({
    local        : {
        email    : String,
        password : String
    }
});

var Record = db.model('record', recordSchema);
var User = db.model('user', userSchema);