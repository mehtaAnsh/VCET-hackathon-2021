var Responder = require('./../../../core/responder');

var Dam = {
	model: require('../models').model,
	helpers: require('../helpers'),
};
var createDam = function (request, response) {
	var dam = new Dam.model(request.body);
	dam.save(function (error, customer) {
		if (error) {
			response.status(500);
			response.json({ error: error });
		} else {
			response.json(customer);
		}
	});
};

var updateDamValue = function (request, response) {
	var { name, threshold } = request.body;
	Dam.model.findOneAndUpdate(
		{},
		{ name, threshold: Number(threshold) },
		{ upsert: false, new: true },
		Responder.respond(response)
	);
};

module.exports = {
	updateDamValue,
	createDam,
};
