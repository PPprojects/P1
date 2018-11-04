const Sequelize = require('sequelize')

const db = require('../_db')

const Department = db.define(
	'department',
	{
		title: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true
		}
	},
	{
		scopes: {
			populated: () => ({
				include: [{ model: db.model('employee'), as: 'Leader' }]
			})
		}
	}
)

module.exports = Department
