const db = require('../_db')
const Employee = require('./employee')
const Department = require('./department')

Department.hasMany(Employee, {
	foreignKey: 'team_id',
	onDelete: 'cascade', // remove all associated employees when department is deleted
	hooks: true // makes the cascade actually work.
})
Department.belongsTo(Employee, { as: 'teamLeader' })
Employee.belongsTo(Department)

module.exports = {
	db,
	Department,
	Employee
}
