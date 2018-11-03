import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import ContentEditable from 'react-contenteditable'
import { updateDepartment, fetchDepartment } from '../../redux/departments'
import { Link } from 'react-router-dom'

/* -----------------    COMPONENT     ------------------ */

class DepartmentDetail extends Component {
	constructor(props) {
		super(props)

		this.state = {
			department: props.department
		}

		this.onDepartmentUpdate = this.onDepartmentUpdate.bind(this)
		this.renderRawHTML = this.renderRawHTML.bind(this)
	}

	componentWillReceiveProps(newProps, oldProps) {
		if (newProps.department !== oldProps.department) {
			this.setState({
				department: newProps.department
			})
		}
	}

	render() {
		const { employees, currentEmployee } = this.props
		const department = this.state.department
		if (!department) return <div /> // the department id is invalid or the data isnt loaded yet
		const authorized =
			currentEmployee &&
			(currentEmployee.isOwner || currentEmployee.id === department.manager_id)
		return (
			<div className="container department-container">
				<ul className="list-inline large-font">
					<li>
						<input
							readOnly={!authorized}
							className="form-like large-font"
							value={department.title}
							onChange={(evt) =>
								this.onDepartmentUpdate({ title: evt.target.value })
							}
							contentEditable={!!authorized}
						/>
					</li>
					<li>
						<span className="muted">by</span>
					</li>
					<li>
						{currentEmployee.isAdmin ? (
							<select
								value={department.author_id}
								onChange={(evt) =>
									this.onDepartmentUpdate({ author_id: evt.target.value })
								}
							>
								{employees.map((employee) => (
									<option key={employee.id} value={employee.id}>
										{employee.name}
									</option>
								))}
							</select>
						) : (
							<Link to={`/employees/${department.author_id}`}>
								{department.author.name || department.author.email}
							</Link>
						)}
					</li>
				</ul>
				<br />
				<ContentEditable
					disabled={!authorized}
					placeholder="(text here)"
					html={this.renderRawHTML()}
					onChange={(evt) =>
						this.onDepartmentUpdate({ paragraphs: evt.target.value })
					}
				/>
			</div>
		)
	}

	renderRawHTML() {
		const { department } = this.state

		let departmentHTML = ''

		if (department && department.paragraphs && department.paragraphs.length) {
			departmentHTML = department.paragraphs.join('<br>')
		}

		return departmentHTML
	}

	onDepartmentUpdate(departmentUpdateObj) {
		const { debouncedUpdateDepartment } = this.props
		const { department } = this.state
		// this is probably pretty fragile
		if (departmentUpdateObj.paragraphs) {
			departmentUpdateObj.paragraphs = departmentUpdateObj.paragraphs.split(
				'<br>'
			)
		}
		this.setState({
			department: Object.assign(department, departmentUpdateObj)
		})
		debouncedUpdateDepartment(department.id, departmentUpdateObj)
	}
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ employees, departments, currentEmployee }, ownProps) => {
	const paramId = Number(ownProps.match.params.id)
	const department = departments.find((department) => department.id === paramId)
	return { department, employees, currentEmployee }
}

const mapDispatch = (dispatch, ownProps) => ({
	debouncedUpdateDepartment: _.debounce((...args) => {
		dispatch(updateDepartment(...args))
	}, 500)
})

export default connect(
	mapState,
	mapDispatch
)(DepartmentDetail)
