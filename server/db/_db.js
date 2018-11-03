const Sequelize = require('sequelize')
//  _db to avoid cyclical importing of db
const db = new Sequelize('postgres://localhost:5432/p1', {
	operatorsAliases: false, //turns off repetitive warning
	define: {
		timestamps: false,
		underscored: true
	},
	logging: false
})

module.exports = db
