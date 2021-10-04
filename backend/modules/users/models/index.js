module.exports = {
	model: undefined,
	init: function () {
		var database = require('../../../core/Database').mongo;
		var Schema = database.Schema;

		// Define Model Schema
		// All timestamps stored as Number
		/***** Model Schema *****


		*****/ 0;
		var DbSchema = new Schema(
			{
				name: { type: String },
				phone_number: { type: String },
				lat: { type: Number },
				long: { type: Number },
			},
			{
				timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
			}
		);

		DbSchema.statics.findByPatientId = function (patient_id, callBack) {
			return this.where('_id', patient_id).exec(callBack);
		};

		DbSchema.statics.searchPatient = function (body, callBack) {
			var builder = undefined;
			// Check if where query included
			if (body.where) builder = this.find(body.where);
			else builder = this.find();

			if (body.distinct) builder = builder.distinct(body.distinct);
			else {
				// SORT, LIMIT, SKIP cannot be used with DISTINCT
				if (body.sort) builder = builder.sort(body.sort);

				if (body.skip)
					// convert to int
					builder = builder.skip(body.skip);

				if (body.limit)
					// convert to int
					builder = builder.limit(body.limit);
			}
			// Execute all
			return builder.exec(callBack);
		};

		// Model
		var DbModel = database.model('Patient', DbSchema);
		// Creating Indices
		// DbModel.collection.createIndex({'name':1, 'type':1});
		// DbModel.collection.createIndex({'status':1});

		this.model = DbModel;

		return DbModel;
	},
};
