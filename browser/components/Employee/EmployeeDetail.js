import React, { Component } from 'react'
import { connect } from 'react-redux'
import EmployeeItem from './EmployeeItem'
import DepartmentItem from '../Department/DepartmentItem'
import { addDepartment } from '../../redux/departments'

/* -----------------    COMPONENT     ------------------ */

class EmployeeDetail extends Component {
	constructor(props) {
		super(props)
		this.onSubmit = this.onSubmit.bind(this)
	}

	render() {
		const { employee, departments, currentEmployee } = this.props
		if (!employee) return <div /> // the employee id is invalid or data isn't loaded yet
		const authorized =
			currentEmployee &&
			(currentEmployee.isAdmin || currentEmployee.id === employee.id)
		return (
			<div className="container">
				<EmployeeItem employee={employee} />
				<div className="panel panel-warning">
					<div className="panel-heading">
						<h2 className="panel-title large-font">departments</h2>
					</div>
					<ul className="list-group">
						{authorized && (
							<form
								className="list-group-item department-item"
								onSubmit={this.onSubmit}
							>
								<input
									name="title"
									type="text"
									className="form-like"
									required
									placeholder="Department Title"
								/>
								<button type="submit" className="btn btn-warning btn-xs">
									<span className="glyphicon glyphicon-plus" />
								</button>
							</form>
						)}
						{departments
							.filter((department) => department.author_id === employee.id)
							.map((department) => (
								<DepartmentItem department={department} key={department.id} />
							))}
					</ul>
				</div>
			</div>
		)
	}

	onSubmit(event) {
		event.preventDefault()
		const { addDepartment, employee } = this.props
		const department = {
			title: event.target.title.value,
			author_id: employee.id
		}
		addDepartment(department)
		event.target.title.value = ''
	}
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ employees, departments, currentEmployee }, ownProps) => {
	const paramId = Number(ownProps.match.params.id)
	return {
		employee: employees.find((employee) => employee.id === paramId),
		departments,
		currentEmployee
	}
}

const mapDispatch = { addDepartment }

export default connect(
	mapState,
	mapDispatch
)(EmployeeDetail)
