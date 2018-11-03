const db = require('../_db')
const Employee = require('./employee')
const Department = require('./department')

Department.hasMany(Employee, {
	onDelete: 'cascade', // remove all associated employees when department is deleted
	hooks: true // makes the cascade actually work.
})
Department.belongsTo(Employee, {
	as: 'Leader',
	foreignKey: 'team_leader_id',
	constraints: false
})

module.exports = {
	db,
	Department,
	Employee
}
