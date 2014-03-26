var key = 'vfH74gOxse9MO4tbHEza';

var http = require('http'),
express = require('express');

var app = express();

app.set('port', 3000);

app.use(express.cookieParser());
app.use(express.session({secret: key}));

app.get('/', function(req, res){
	req.session.secret = key;
	res.send('<p>Session Set: ' + key);
});

app.get('/:id', function(req, res){
	if (req.session.secret === key) {
        console.log("----------- CORRECT SESSION SECRED KEY ------------");
        var picId = req.params.id;
        res.sendfile(__dirname + '/imgs/' + picId + '.jpg');
    } else {
        console.log("----------- BAD SESSION SECRED KEY ------------");
        res.send('<p>Unauthorized user!');
    }
});


// let's create a basic http server!
http.createServer(app).listen(3000);

console.log('> hello world running on port 3000');
