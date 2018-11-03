const db = require('../_db')
const Employee = require('./employee')
const Department = require('./department')

Department.hasMany(Employee, {
	onDelete: 'cascade', // remove all associated employees when department is deleted
	hooks: true // makes the cascade actually work. Yay Sequelize!
})
Employee.belongsTo(Department)

module.exports = {
	db,
	Department,
	Employee
}
