var express = require("express");
var parser = require('body-parser');
var exphbs  = require('express-handlebars');
var app = express();
var server = require('http').Server(app);
var path = require('path');
var fs = require('fs');
var conf = require('./config/conf.json');

/*Setup*/
app.set('port', (process.env.PORT) || 5000);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
/*Serve from public directory*/
app.use(express.static(path.join(__dirname, 'public/')));
/*submitted data will be parsed as JSON */
app.use(parser.json());
/*Static resources from node_modules */
app.use('/vue', express.static(path.join(__dirname, 'node_modules/vue/dist/')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist/')));

/*Request Handling*/
app.param('id', (req, res, next, id) => {
	console.log("Processing param: "+id);
	var path = "tmp/"+id;
	if (fs.existsSync(path)) {
		fs.readFile(path, 'utf8', (err, data) => {
			if (err) {
				console.log("Error getting file at path "+path, err);
				return next(err);
			}
			if (data) {
				req.character = JSON.parse(data);
				return next();
			}
		});
	}
});

app.get('/:id', (req, res) => {
	console.log("Getting for ID");
	var characterData = req.character;
	res.render('castlesandcrusades', {
        data: JSON.stringify(characterData)
    });
});

app.get('/', (req, res) => {
	console.log("Getting without id");
	var characterData = conf.defaultData;
	res.render('castlesandcrusades', {
		data: JSON.stringify(characterData)
	});
});
/*literally just write JSONs to flat files for now. Add a proper DB at some point if deemed necessary */
app.post('/', (req, res) => {
	
	console.log("Posted");
	var data = req.body;
	//using name as ID for now
	var id = data.general.name;
	var path = "tmp/"+id;
	var dataToWrite = JSON.stringify(data);
	fs.writeFile(path, dataToWrite, (err) => {
		if(err) {
			console.log("Error");
			var retObj = {
				"success": 0,
				"message": "Unable to save data",
				"details": err.toString()
			};
			res.send(JSON.stringify(retObj));
			return console.log(err);
		}
		//console.log("redirecting");
		//redirect to url of their saved character
		//res.redirect('/'+id);
		console.log("Saved data");
	});
});

/*Init*/
server.listen(app.get('port'), () => console.log("Server initiated and listening on port: " + app.get('port')));