const Sequelize = require('sequelize')

const db = require('../_db')

const Employee = db.define('employee', {
	name: Sequelize.STRING,
	photo: {
		type: Sequelize.STRING,
		defaultValue: '/images/default-photo.jpg'
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	password: Sequelize.STRING,
	isOwner: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	isManager: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	googleId: Sequelize.STRING,
	githubId: Sequelize.STRING,
	twitterId: Sequelize.STRING
})

module.exports = Employee
