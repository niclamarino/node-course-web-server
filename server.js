const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

app.use((req, res, next) => {
	let now = new Date().toString();
	let log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', err => {
			console.log('Unable to append to server.log')
	})
	next();
});

app.use((req,res) => {
	res.render('maintanance.hbs');
})

hbs.registerHelper('screamIt', text => {
	return text.toUpperCase();
})

app.get('/',(req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home page',
		welcomeMessage: 'Hey, welcome to my website!'
	})
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to fulfill this request'
	})
})

app.listen(3000, () => {
	console.log('Server is up on port 3000')
});


