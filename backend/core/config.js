require('dotenv').config();

const MONGO_SERVER_URI = process.env.MONGO_SERVER_URI;

module.exports = {
	MONGO_SERVER_URI,
};
