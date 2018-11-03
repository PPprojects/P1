import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeEmployee } from '../../redux/employees'

/* -----------------    COMPONENT     ------------------ */

class EmployeeItem extends Component {
	constructor(props) {
		super(props)
		this.removeEmployeeCallback = this.removeEmployeeCallback.bind(this)
	}

	render() {
		const { employee, currentEmployee } = this.props
		return (
			<div className="list-group-item min-content employee-item">
				<div className="media">
					<div className="media-left media-middle icon-container">
						<img className="media-object img-circle" src={employee.photo} />
					</div>
					<NavLink
						className="media-body"
						activeClassName="active"
						to={`/employees/${employee.id}`}
					>
						<h4 className="media-heading tucked">
							<span placeholder="Jean Doe">{employee.name}</span>
						</h4>
						<h5 className="tucked">
							<span>{employee.email}</span>
						</h5>
						<h5 className="tucked">
							<span>{employee.phone}</span>
						</h5>
					</NavLink>
					{currentEmployee.isAdmin && (
						<div className="media-right media-middle">
							<button
								className="btn btn-default"
								onClick={this.removeEmployeeCallback}
							>
								<span className="glyphicon glyphicon-remove" />
							</button>
						</div>
					)}
				</div>
			</div>
		)
	}

	removeEmployeeCallback(event) {
		const { removeEmployee, employee } = this.props
		removeEmployee(employee.id)
	}
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ currentEmployee }) => ({ currentEmployee })

// When given just an object, react-redux wraps the functions in dispatch, so when `removeEmployee` is invoked off of props in the component, it will call `dispatch(removeEmployee(params))`
const mapDispatch = { removeEmployee }

// The above is a shorthand for what is below
//    Note: if you want to use the implicit return of an arrow function to return an object, wrap that object in parens
// const mapDispatch = (dispatch) => ({
//   removeEmployee: (employeeId) => dispatch(removeEmployee(employeeId))
// })

export default connect(
	mapState,
	mapDispatch
)(EmployeeItem)
