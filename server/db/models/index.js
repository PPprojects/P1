const db = require('../_db')
const Employee = require('./employee')
const Department = require('./department')

Department.hasMany(Employee, {
	onDelete: 'cascade', // removes all associated employees when a department is deleted
	hooks: true // helps the cascade actually got all the way to the server and back
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
