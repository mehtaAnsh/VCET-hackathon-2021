const express = require('express');
const app = express();
const router = express.Router();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./core/Database').init(function () {
	/**
	 * Initialise all modules here
	 */
	require('./modules/users/models').init();
	require('./modules/dam/models').init();

	var PatientRouter = require('./modules/users/routes');
	var DamRouter = require('./modules/dam/routes');

	PatientRouter(router);
	DamRouter(router);
});

/**
 * Configure CORS middleware
 */
router.use(function (request, response, next) {
	// Website you wish to allow to connect
	response.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	response.setHeader(
		'Access-Control-Allow-Headers',
		'Authorization, X-Requested-With, content-type, key, token, by-pass'
	);

	// Set true if you need the website to include cookies in the requests sent
	// to the API ( e.g in case you use sessions )
	response.setHeader('Access-Control-Allow-Credentials', true);

	next();
});

// * Test route
app.get('/', function (request, response) {
	response.json({ message: 'It Works!', version: config.VERSION });
});

app.get('/getToken', (req, res) => {
	const { generate_token } = require('./middleware/tokenAuth');
	const token = generate_token();
	res.json({ token });
});

app.use('/', router);

app.listen(port);

console.log('App listening on port 5000');
