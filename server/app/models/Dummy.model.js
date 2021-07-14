const Sequelize = require('sequelize');
const db = require('../config/db.config.js');

const Dummy = db.define('dummy', {
	id: {
		type: Sequelize.UUID,
		primaryKey: true,
		autoIncrement: true,
	},

	name: {
		type: Sequelize.STRING,
		allowNull: true,
	},

	age: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},

	message: {
		type: Sequelize.STRING,
		allowNull: false,
	}
});

module.exports = Dummy;

