module.exports = {
	init: function (callBack) {
		const config = require('./config');
		const mongoose = require('mongoose');

		console.log('Attemption Mongo DB connection: ');

		var dbOptions = {
			keepAlive: true,
			useUnifiedTopology: true,
		};

		dbOptions.useNewUrlParser = true;

		mongoose.connect(config.MONGO_SERVER_URI, dbOptions, error => {
			// arrow function to keep "this" in scope
			if (error) {
				console.log('Mongo DB could not be connected: ' + error);
			} else {
				// Connetion successful
				this.mongo = mongoose;
				console.log('... Mongo DB Connected');

				if (callBack) callBack();
			}
		});
		return true;
	},
};
