var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');


var app = express();
var port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../')));
app.use(express.static(path.join(__dirname, '../client')));



app.use(function(req, res, next){
    if (path.extname(req.path).length > 0){
        res.status(404).end();
    }
    else{
        next(null);
    }
});

app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.use(function(err, req, res, next){
    res.status(err.status || 500).send(err.message || "internal server error");
});

app.listen(port, function(){
    console.log('Listening on ' + port);
});