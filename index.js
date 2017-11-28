var express = require("express");
var app = express();
var server = require('http').Server(app);
var path = require('path');
var fs = require('fs');
var conf = require('./config/conf.json');


app.set('port', (process.env.PORT) || 5000);

app.use(express.static(path.join(__dirname, 'public/')));
app.use('/vue', express.static(path.join(__dirname, 'node_modules/vue/dist/')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist/')));

var characterData = conf.defaultData;

app.param('id', (req, res, next, id) => {
	var path = "tmp/"+id;
	if (fs.existsSync(path)) {
		fs.readFile(path, 'utf8', (err, data) => {
			if(err) throw err;
			characterData = JSON.parse(data);
			console.log(characterData);
			next();
		});
	}
});

app.get('/:id', (req, res) => {
	res.sendFile(path.join(__dirname, 'views/sheet.html'))
});

app.post('/', function (req, res) {
  res.send('POST request received');
  //do actual stuff
});

server.listen(app.get('port'), () => console.log("Server initiated and listening on port: " + app.get('port')));