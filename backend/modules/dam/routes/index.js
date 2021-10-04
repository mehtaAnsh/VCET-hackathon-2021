module.exports = function (router) {
	var Dam = require('../handlers');

	router.route('/createDam').post(Dam.createDam);
	router.route('/updateDamValue').post(Dam.updateDamValue);

	return true;
};
