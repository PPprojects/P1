import axios from 'axios'

/* -----------------    ACTION TYPES    ------------------ */

const SET_CURRENT_EMPLOYEE = 'SET_CURRENT_EMPLOYEE'
const REMOVE_CURRENT_EMPLOYEE = 'REMOVE_CURRENT_EMPLOYEE'

/* ------------     ACTION CREATORS      ------------------ */

const setCurrentEmployee = (employee) => ({
	type: SET_CURRENT_EMPLOYEE,
	employee
})
const removeCurrentEmployee = () => ({ type: REMOVE_CURRENT_EMPLOYEE })

/* ------------          REDUCER         ------------------ */

export default function reducer(currentEmployee = {}, action) {
	switch (action.type) {
		case SET_CURRENT_EMPLOYEE:
			return action.employee

		case REMOVE_CURRENT_EMPLOYEE:
			return {}

		default:
			return currentEmployee
	}
}

/* ------------       THUNK CREATORS     ------------------ */

export const login = (credentials, history) => (dispatch) => {
	axios
		.put('/auth/local/login', credentials)
		.then((res) => setEmployeeAndRedirect(res.data, history, dispatch))
		.catch((err) =>
			console.error(
				`Logging in with ${credentials.email} and ${
					credentials.password
				} was unsuccesful`,
				err
			)
		)
}

export const logout = (history) => (dispatch) => {
	axios
		.delete('/auth/local/logout')
		.then((res) => dispatch(removeCurrentEmployee(res.data)))
		.then(() => history.push('/login'))
		.catch((err) => console.error('Logging out was unsuccesful', err))
}

export const signup = (credentials) => (dispatch) => {
	axios
		.post('/auth/local/signup', credentials)
		.then((res) => setEmployeeAndRedirect(res.data, history, dispatch))
		.catch((err) =>
			console.error(
				`Signing up with ${credentials.email} and ${
					credentials.password
				} was unsuccesful`,
				err
			)
		)
}

export const fetchCurrentEmployee = () => (dispatch) => {
	axios
		.get('/auth/local/me')
		.then((res) => setCurrentEmployee(res.data))
		.catch((err) => console.error('Fetching current employee failed', err))
}

/* ------------      HELPER FUNCTIONS     ------------------ */

function setEmployeeAndRedirect(employee, history, dispatch) {
	dispatch(setCurrentEmployee(employee))
	history.push(`/employees/${employee.id}`)
}
