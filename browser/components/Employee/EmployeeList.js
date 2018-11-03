import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addEmployee } from '../../redux/employees'
import EmployeeItem from './EmployeeItem'

/* -----------------    COMPONENT     ------------------ */

class EmployeeList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			email: '',
			phone: ''
		}

		this.filterEmployee = this.filterEmployee.bind(this)
		this.renderEmployeeSearch = this.renderEmployeeSearch.bind(this)
		this.renderNewEmployeeWidget = this.renderNewEmployeeWidget.bind(this)
		this.onNewEmployeeSubmit = this.onNewEmployeeSubmit.bind(this)
	}

	render() {
		const { currentEmployee } = this.props
		return (
			<div className="container">
				<div className="employee-query">
					{this.renderEmployeeSearch()}
					{currentEmployee.isAdmin && this.renderNewEmployeeWidget()}
				</div>
				<br />
				<br />
				<div className="employee-list">
					{this.props.employees.filter(this.filterEmployee).map((employee) => (
						<EmployeeItem employee={employee} key={employee.id} />
					))}
				</div>
			</div>
		)
	}

	renderEmployeeSearch() {
		return (
			<div className="list-group-item min-content employee-item">
				<div className="media">
					<div className="media-left media-middle icon-container">
						<span className="glyphicon glyphicon-search" />
					</div>
					<div className="media-body">
						<h4 className="media-heading tucked">
							<input
								type="text"
								placeholder="Jean Doe"
								className="form-like"
								onChange={(evt) => this.setState({ name: evt.target.value })}
							/>
						</h4>
						<h5 className="tucked">
							<input
								type="email"
								placeholder="email@website.com"
								className="form-like"
								onChange={(evt) => this.setState({ email: evt.target.value })}
							/>
						</h5>
						<h5 className="tucked">
							<input
								type="tel"
								placeholder="(555) 555-5555"
								className="form-like"
								onChange={(evt) => this.setState({ phone: evt.target.value })}
							/>
						</h5>
					</div>
				</div>
			</div>
		)
	}

	filterEmployee(department) {
		const nameMatch = new RegExp(this.state.name, 'i')
		const emailMatch = new RegExp(this.state.email, 'i')
		const phoneMatch = new RegExp(this.state.phone, 'i')

		return (
			nameMatch.test(department.name) &&
			emailMatch.test(department.email) &&
			phoneMatch.test(department.phone)
		)
	}

	renderNewEmployeeWidget() {
		return (
			<div className="list-group-item min-content employee-item">
				<form className="media" onSubmit={this.onNewEmployeeSubmit}>
					<div className="media-left media-middle icon-container">
						<button
							type="submit"
							className="glyphicon glyphicon-plus clickable"
						/>
					</div>
					<div className="media-body">
						<h4 className="media-heading tucked">
							<input
								name="name"
								type="text"
								required
								placeholder="Jean Doe"
								className="form-like"
							/>
						</h4>
						<h5 className="tucked">
							<input
								name="email"
								type="email"
								required
								placeholder="email@website.com"
								className="form-like"
							/>
						</h5>
						<h5 className="tucked">
							<input
								name="phone"
								type="tel"
								placeholder="(555) 555-5555"
								className="form-like"
							/>
						</h5>
					</div>
				</form>
			</div>
		)
	}

	onNewEmployeeSubmit(event) {
		event.preventDefault()
		const employee = {
			name: event.target.name.value,
			email: event.target.email.value,
			phone: event.target.phone.value
		}
		this.props.addEmployee(employee)
		// clear the inputs
		event.target.name.value = ''
		event.target.email.value = ''
		event.target.phone.value = ''
	}
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ employees, currentEmployee }) => ({
	currentEmployee,
	employees
})

const mapDispatch = { addEmployee }

export default connect(
	mapState,
	mapDispatch
)(EmployeeList)
