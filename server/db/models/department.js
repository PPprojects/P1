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
		// ,
		// paragraphs: {
		// 	type: Sequelize.ARRAY(Sequelize.TEXT),
		// 	defaultValue: []
		// }
	}
	// ,
	// {
	// 	scopes: {
	// 		populated: () => ({
	// 			include: [
	// 				{
	// 					model: db.model('user'),
	// 					as: 'author'
	// 				}
	// 			]
	// 		})
	// 	}
	// }
)

module.exports = Department
