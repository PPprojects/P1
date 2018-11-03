import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeDepartment } from '../../redux/departments'

/* -----------------    COMPONENT     ------------------ */

class DepartmentItem extends Component {
	render() {
		const { department, removeDepartment, currentEmployee } = this.props
		const authorized =
			currentEmployee &&
			(currentEmployee.isAdmin || currentEmployee.id === department.author_id)
		return (
			<li className="list-group-item department-item">
				<ul className="list-inline">
					<li>
						<Link className="large-font" to={`/departments/${department.id}`}>
							{department.title}
						</Link>
					</li>
					<li>
						<span>by</span>
					</li>
					<li>
						<Link to={`/employees/${department.author_id}`}>
							{department.author.name || department.author.email}
						</Link>
					</li>
				</ul>
				{authorized && (
					<button
						className="btn btn-default btn-xs"
						onClick={() => removeDepartment(department.id)}
					>
						<span className="glyphicon glyphicon-remove" />
					</button>
				)}
			</li>
		)
	}
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ currentEmployee }) => ({ currentEmployee })
// // equivalent to:
// const mapState = (state) => {
//   return {
//     currentEmployee: state.currentEmployee
//   };
// };

const mapDispatch = { removeDepartment }

export default connect(
	mapState,
	mapDispatch
)(DepartmentItem)
