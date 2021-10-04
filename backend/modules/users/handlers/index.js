require('dotenv').config();

var Patient = {
	model: require('../models').model,
	helpers: require('../helpers'),
};

const axios = require('axios').create();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const mbxStatic = require('@mapbox/mapbox-sdk/services/static');
const staticClient = mbxStatic({
	accessToken: 'pk.eyJ1IjoibWVodGFuc2giLCJhIjoiY2t1OG83ZnJ2NXdmdDJ1bXA5ajFmM3cwZiJ9.OuGeYt4Z3kkzGYa6c0O5OA',
});

var alertUsers = async function (request, response) {
	Patient.model.find({}, { created_at: 0, updated_at: 0, __v: 0 }, function (error, users) {
		if (error) {
			response.status(500);
			response.json({ error: error });
		} else {
			var filtered_users = users.filter(user => {
				a = user.lat - request.body.test_lat;
				b = user.long - request.body.test_long;
				c = Math.sqrt(a * a + b * b);
				return c < 1;
			});
			try {
				filtered_users.map(async user => {
					await client.messages
						.create({
							from: 'whatsapp:+14155238886',
							body: `Dear ${user.name}, a flood has been detected. Kindly contact your local authorities.`,
							to: `whatsapp:${user.phone_number}`,
						})
						.then(async () => {
							await client.messages
								.create({
									from: '+12056512326',
									body: `Dear ${user.name}, a flood has been detected. Kindly contact your local authorities.`,
									to: user.phone_number,
								})
								.then(() => {
									response.json({ message: 'done' });
								});
						});
				});
			} catch (err) {
				response.status(500).json({ message: 'An unknown error occured.' });
			}
		}
	});
};

var addUser = function (request, response) {
	var patient = new Patient.model(request.body);
	patient.save(function (error, patient) {
		if (error) {
			response.status(500);
			response.json({ error: error });
		} else {
			response.json(patient);
		}
	});
};

var getSatImage = async function (request, response) {
	const { lat, long } = request.body;

	const req = staticClient.getStaticImage({
		ownerId: 'mapbox',
		styleId: 'satellite-v9',
		width: 300,
		height: 300,
		position: {
			coordinates: [Number(lat), Number(long)],
			zoom: 13,
		},
	});
	const staticImageUrl = req.url();
	response.json({ url: staticImageUrl });
};

module.exports = {
	alertUsers,
	addUser,
	getSatImage,
};
