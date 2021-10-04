var respond = function (response, message) {
	return function (error, object) {
		if (error) {
			// console.log("-- responder error ", error)

			response.status(500);
			response.json({ message: error });
		} else if (message) {
			if (object) {
				response.json({ message: message, object: object });
			} else {
				response.json({ message: message });
			}
		} else {
			// console.log("-- responder object ", object)
			response.json(object);
		}
	};
};

module.exports = { respond };
