var hasOwnProperty = Object.prototype.hasOwnProperty;
//NOTE copied from some other service (realtime?), some functions don't work, be careful when using then for configurations
function isUndefined(str, emptyStringCheck) {
	if (typeof str === 'undefined' || str === null || str === 'undefined' || str === 'null') {
		return true;
	}
	if (emptyStringCheck && typeof str === 'string' && str.toString().trim().length === 0) {
		return true;
	}
	return false;
}

function isNumberInt(n) {
	return n % 1 === 0;
}

function isTypeString(val) {
	return toString.call(val) === '[object String]' ? true : false;
}

function isTypeNumber(val) {
	return toString.call(val) === '[object Number]' ? true : false;
}

function isTypeBoolean(val) {
	return toString.call(val) === '[object Boolean]' ? true : false;
}

function isTypeObject(val) {
	return toString.call(val) === '[object Object]' ? true : false;
}

function isTypeArray(val) {
	return toString.call(val) === '[object Array]' ? true : false;
}

function isTypeFunction(val) {
	return toString.call(vall) === '[object Funciton]' ? true : false;
}

function isStringValidNumber(val) {
	if (isTypeString(val)) {
		var num = Number(val.trim());
		if (isNaN(num)) {
			return false;
		} else {
			return true;
		}
	} else {
		return false;
	}
}

function getValidStr(val) {
	if (!isUndefined(val) && isTypeString(val)) {
		return val.trim();
	} else if (isTypeNumber(val)) {
		return val.toString().trim();
	} else {
		return null;
	}
}

function getValidNumber(val) {
	if (isUndefined(val)) {
		return null;
	}

	if (isTypeNumber(val)) {
		return val;
	} else if (isTypeString(val) && isStringValidNumber(val)) {
		return Number(val);
	} else {
		return null;
	}
}

function getValidBool(val) {
	if (!isUndefined(val)) {
		if (isTypeBoolean(val)) {
			return val;
		} else if (val == 'true') {
			return true;
		} else if (val == 'false') {
			return false;
		}
	}
}

function isValidLatitude(val) {
	if (isTypeNumber(val) && val >= -90 && val <= 90) {
		return true;
	}
	return false;
}

function isValidLongitude(val) {
	if (isTypeNumber(val) && val >= -180 && val <= 180) {
		return true;
	}
	return false;
}

function getValidGeoPt(val) {
	if (!isUndefined(val) && isTypeObject(val)) {
		var latitude = getValidNumber(val.latitude);
		var longitude = getValidNumber(val.longitude);
		if (isValidLatitude(latitude) && isValidLongitude(longitude)) {
			return {
				longitude: longitude,
				latitude: latitude,
			};
		} else {
			return null;
		}
	}
}

function getValidDate(val) {
	// var num = getValidNumber(val);
	if (!isUndefined(val)) {
		var date = new Date(val);
		if (!isNaN(date.getTime())) {
			return date;
		} else {
			return null;
		}
	} else {
		return null;
	}
}

function isObjectEmpty(obj) {
	// null and undefined are "empty"
	if (obj == null) return true;

	// Assume if it has a length property with a non-zero value
	// that that property is correct.
	if (obj.length > 0) return false;
	if (obj.length === 0) return true;

	// Otherwise, does it have any properties of its own?
	// Note that this doesn't handle
	// toString and valueOf enumeration bugs in IE < 9
	for (var key in obj) {
		if (hasOwnProperty.call(obj, key)) return false;
	}

	return true;
}

function getCurrentTime() {
	return new Date().getTime();
}

module.exports = {
	isUndefined: isUndefined,
	isNumberInt: isNumberInt,
	isTypeString: isTypeString,
	isTypeNumber: isTypeNumber,
	getValidStr: getValidStr,
	getValidNumber: getValidNumber,
	isStringValidNumber: isStringValidNumber,
	isTypeObject: isTypeObject,
	getValidGeoPt: getValidGeoPt,
	getValidBool: getValidBool,
	getValidDate: getValidDate,
	isTypeArray: isTypeArray,
	isValidLatitude: isValidLatitude,
	isValidLongitude: isValidLongitude,
	isTypeFunction: isTypeFunction,
	isObjectEmpty: isObjectEmpty,
	getCurrentTime: getCurrentTime,
};
