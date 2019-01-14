const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//Creating our own middleware to keep track of how our server is working
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	//appendFile MUST have a CALLBACK Function!
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log.');
		}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+ '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home page',
		welcomeMessage: 'Hey there! Nice to meet you, I am Ifenna.'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bah', (req, res) =>{
	res.send({
		errorMessage: 'Unable to handle request'
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});