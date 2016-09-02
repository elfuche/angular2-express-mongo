var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mean2');
var db = mongoose.connection;
mongoose.Promise = global.Promise;

var contactSchema = mongoose.Schema({
	name : String,
	phone : Number,
	email : String
});

var Contact = mongoose.model('Contact', contactSchema);

db.on('error', console.error.bind('error db connection'));

db.once('open', function(){
	console.log('connected to db');
	/* GET home page. */
    router.get('/', function(req, res, next) {
      res.render('index');
    });

    // select all
    router.get('/contacts', function(req, res) {
        Contact.find({}, function(err, docs) {
            if(err) return console.error(err);
            res.json(docs);
        });
    });

    // create
    router.post('/contact', function(req, res) {
        var obj = new Contact(req.body);
        obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
        });
    });
});


module.exports = router;
