/**
 * Customer.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

var bcrypt = require('bcryptjs');

module.exports = {

	attributes: {

		name: {
			type: 'string',
			required: true,
		},
		email: {
			type: 'string',
			required: true,
			unique: true,
			isEmail: true,
		},
		password: {
			type: 'string',
			required: true
		},

	},
	customToJSON: function () {
		return _.omit(this, ['password'])
	},
	beforeCreate: function (user, cb) {
		bcrypt.genSalt(10, function (err, salt) {
			bcrypt.hash(user.password, salt, function (err, hash) {
				if (err) return cb(err);
				user.password = hash;
				return cb();
			});
		});
	},

};
