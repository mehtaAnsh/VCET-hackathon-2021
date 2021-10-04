const jwt = require('jsonwebtoken');

const validate_token = function (req, res, next) {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
		try {
			token = req.headers.authorization.split(' ')[1].toString();

			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				// TO check Token expiry
				if (err && err.name === 'TokenExpiredError') {
					res.status(419).send('Token Expired. Please login again.'); // Token Expired
					return;
				}
				// For other JWT-related errors
				if (err) {
					res.status(401).send('Unauthorized, invalid token.');
					return;
				}
				next();
			});
		} catch (error) {
			console.error(error);
			res.status(401);
			res.send('Unauthorized, no token');
		}

	if (!token) {
		res.status(401);
		res.send('Unauthorized, no token');
	}
};

const generate_token = email => {
	var token = jwt.sign(
		{
			data: {
				email,
			},
		},
		process.env.JWT_SECRET,
		{ expiresIn: '24h' }
	);
	return token;
};

module.exports = { validate_token, generate_token };
