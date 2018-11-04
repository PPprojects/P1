import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import EmployeeList from './Employee/EmployeeList'
import EmployeeDetail from './Employee/EmployeeDetail'
import DepartmentList from './Department/DepartmentList'
import DepartmentDetail from './Department/DepartmentDetail'
import Navbar from './Navbar'
import Footer from './Footer'

import { fetchEmployees } from '../redux/employees'
import { fetchDepartments } from '../redux/departments'
import { fetchCurrentEmployee } from '../redux/auth'

/* -----------------    COMPONENT     ------------------ */

class Root extends Component {
	componentDidMount() {
		this.props.fetchInitialData()
	}
	render() {
		return (
			<Router>
				<div id="main" className="container-fluid">
					<Navbar />
					<Route exact path="/" component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
					<Route exact path="/employees" component={EmployeeList} />
					<Route path="/employees/:id" component={EmployeeDetail} />
					<Route exact path="/departments" component={DepartmentList} />
					<Route path="/departments/:id" component={DepartmentDetail} />
					<Footer />
				</div>
			</Router>
		)
	}
}

/* -----------------    CONTAINER     ------------------ */

const mapState = null

const mapDispatch = (dispatch) => ({
	fetchInitialData: () => {
		dispatch(fetchEmployees())
		dispatch(fetchDepartments())
		dispatch(fetchCurrentEmployee())
	}
})
export default connect(mapState, mapDispatch)(Root)
