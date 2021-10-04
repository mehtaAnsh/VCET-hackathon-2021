const { validate_token } = require('../../../middleware/tokenAuth');

module.exports = function (router) {
	var Patient = require('../handlers');

	router.route('/alert_users').post(validate_token, Patient.alertUsers);

	router.route('/add_user').post(Patient.addUser);

	router.route('/getSatImage').post(Patient.getSatImage);

	return true;
};
