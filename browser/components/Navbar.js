import React from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'

import { logout } from '../redux/auth'

/* -----------------    COMPONENT     ------------------ */

class Navbar extends React.Component {
	constructor(props) {
		super(props)
		this.renderLoginSignup = this.renderLoginSignup.bind(this)
		this.renderLogout = this.renderLogout.bind(this)
	}

	render() {
		return (
			<nav className="navbar navbar-default">
				<div className="container">
					<div className="navbar-header">
						<button
							type="button"
							className="navbar-toggle collapsed"
							data-toggle="collapse"
							data-target=".navbar-collapse"
						>
							<span className="icon-bar" />
							<span className="icon-bar" />
							<span className="icon-bar" />
						</button>
						<NavLink className="navbar-brand" to="/">
							<img src="/images/logo.png" />
						</NavLink>
					</div>
					<div className="collapse navbar-collapse">
						<ul className="nav navbar-nav">
							<li>
								<NavLink to="/employees" activeClassName="active">
									employees
								</NavLink>
							</li>
							<li>
								<NavLink to="/departments" activeClassName="active">
									departments
								</NavLink>
							</li>
						</ul>
						{this.props.currentEmployee.id
							? this.renderLogout()
							: this.renderLoginSignup()}
					</div>
				</div>
			</nav>
		)
	}

	renderLoginSignup() {
		return (
			<ul className="nav navbar-nav navbar-right">
				<li>
					<NavLink to="/signup" activeClassName="active">
						signup
					</NavLink>
				</li>
				<li>
					<NavLink to="/login" activeClassName="active">
						login
					</NavLink>
				</li>
			</ul>
		)
	}

	renderLogout() {
		const name =
			this.props.currentEmployee.name || this.props.currentEmployee.email
		return (
			<ul className="nav navbar-nav navbar-right">
				<li>
					<button
						className="navbar-btn btn btn-default"
						onClick={this.props.logout}
					>
						logout {name}
					</button>
				</li>
			</ul>
		)
	}
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ currentEmployee }) => ({ currentEmployee })

// // equivalent to:
// const mapState = state => {
//   return {
//     currentEmployee: state.currentEmployee
//   };
// };

const mapDispatch = (dispatch, ownProps) => ({
	logout: () => {
		dispatch(logout(ownProps.history))
	}
})

export default withRouter(
	connect(
		mapState,
		mapDispatch
	)(Navbar)
)
