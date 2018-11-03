const Sequelize = require('sequelize')
//_db to avoid cyclical importing of db, not the best design, I know but I'm used to it by now
const db = new Sequelize('postgres://localhost:5432/p1', {
	define: {
		timestamps: false,
		underscored: true
	},
	logging: false
})

module.exports = db
