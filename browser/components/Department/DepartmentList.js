import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import DepartmentItem from './DepartmentItem'
import { addDepartment } from '../../redux/departments'

/* -----------------    COMPONENT     ------------------ */

class DepartmentList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			title: '',
			name: ''
		}

		this.filterDepartment = this.filterDepartment.bind(this)
		this.renderDepartmentSearch = this.renderDepartmentSearch.bind(this)
		this.renderNewDepartmentWidget = this.renderNewDepartmentWidget.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	render() {
		const { currentEmployee } = this.props
		return (
			<div className="container">
				{this.renderDepartmentSearch()}
				<br />

				<ul className="list-group">
					{currentEmployee.id && this.renderNewDepartmentWidget()}
					{this.props.departments
						.filter(this.filterDepartment)
						.map((department) => (
							<DepartmentItem department={department} key={department.id} />
						))}
				</ul>
			</div>
		)
	}

	renderDepartmentSearch() {
		return (
			<div className="list-group-item department-item">
				<ul className="list-inline">
					<li>
						<input
							type="text"
							placeholder="Department Title"
							className="form-like large-font"
							onChange={(evt) => this.setState({ title: evt.target.value })}
						/>
					</li>
					<li>
						<span>by</span>
					</li>
					<li>
						<input
							className="form-like"
							type="text"
							placeholder="Jean Doe"
							onChange={(evt) => this.setState({ name: evt.target.value })}
						/>
					</li>
				</ul>
				<span className="glyphicon glyphicon-search" />
			</div>
		)
	}

	renderNewDepartmentWidget() {
		const { currentEmployee } = this.props
		return (
			<form
				onSubmit={this.onSubmit}
				className="list-group-item department-item"
			>
				<ul className="list-inline">
					<li>
						<input
							name="title"
							type="text"
							className="form-like large-font"
							placeholder="Department Title"
						/>
					</li>
					<li>
						<span>by</span>
					</li>
					<li>
						{currentEmployee.isAdmin ? (
							<select name="author_id" defaultValue="" required>
								<option value="" disabled>
									(select an author)
								</option>
								{this.props.employees.map((employee) => (
									<option key={employee.id} value={employee.id}>
										{employee.name}
									</option>
								))}
							</select>
						) : (
							<Link to={`/employees/${currentEmployee.id}`}>
								{currentEmployee.name || currentEmployee.email}
							</Link>
						)}
					</li>
				</ul>
				<button type="submit" className="btn btn-warning btn-xs pull-right">
					<span className="glyphicon glyphicon-plus" />
				</button>
			</form>
		)
	}

	filterDepartment(department) {
		// this is necessary as a employee can be deleted and his departments are orphaned
		const authorName =
			department && department.author ? department.author.name : ''
		const titleMatch = new RegExp(this.state.title, 'i')
		const nameMatch = new RegExp(this.state.name, 'i')

		return titleMatch.test(department.title) && nameMatch.test(authorName)
	}

	onSubmit(event) {
		event.preventDefault()
		const { addDepartment, currentEmployee } = this.props
		const { author_id, title } = event.target
		const department = {
			author_id: author_id ? author_id.value : currentEmployee.id,
			title: title.value
		}
		addDepartment(department)
		if (author_id) event.target.author_id.value = ''
		event.target.title.value = ''
	}
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ employees, departments, currentEmployee }) => ({
	employees,
	departments,
	currentEmployee
})

const mapDispatch = { addDepartment }

export default connect(
	mapState,
	mapDispatch
)(DepartmentList)
