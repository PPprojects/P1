const Sequelize = require('sequelize')
//  this is just to avoid cyclical importing of db
const db = new Sequelize('postgres://localhost:5432/p1', {
	operatorsAliases: false, //turns off the repetitive sequelize warning about symbols
	define: {
		timestamps: false,
		underscored: true
	},
	logging: false
})

module.exports = db
