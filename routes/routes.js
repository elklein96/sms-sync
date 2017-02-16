var fs = require('fs');

exports.getDB = function(req, res, next) {
    var config, firebaseURL;
    fs.readFile('config.json', 'utf8', function (err, data) {
        if (err) {
            res.status(500);
            res.send();
            return next();
        }
        config = JSON.parse(data);
        firebaseURL = config.firebaseURL;
        if (firebaseURL !== undefined && firebaseURL !== "") {
            res.status(200);
            res.send(firebaseURL);
        } else {
            res.status(400);
            res.send("No FirebaseDB provided");
        }
        return next();
    });
};

exports.setDB = function(req, res, next) {
    var config = require('../config.json');

    config.firebaseURL = req.body.firebaseURL;

    console.log(req.body.firebaseURL);

    fs.writeFile('config.json', JSON.stringify(config, null, 2), function (err) {
        if (err){
            res.status(500);
            res.send();
            return next();
        }
        res.status(200);
        res.send();
        return next();
    });
};