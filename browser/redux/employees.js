import axios from 'axios'

/* -----------------    ACTION TYPES    ------------------ */

const INITIALIZE = 'INITIALIZE_EMPLOYEES'
const CREATE = 'CREATE_EMPLOYEE'
export const REMOVE = 'REMOVE_EMPLOYEE'
const UPDATE = 'UPDATE_EMPLOYEE'

/* ------------     ACTION CREATORS      ------------------ */

const init = (employees) => ({ type: INITIALIZE, employees })
export const create = (employee) => ({ type: CREATE, employee })
const remove = (id) => ({ type: REMOVE, id })
const update = (employee) => ({ type: UPDATE, employee })

/* ------------          REDUCER         ------------------ */

export default function reducer(employees = [], action) {
	switch (action.type) {
		case INITIALIZE:
			return action.employees

		case CREATE:
			return [action.employee, ...employees]

		case REMOVE:
			return employees.filter((employee) => employee.id !== action.id)

		case UPDATE:
			return employees.map(
				(employee) =>
					action.employee.id === employee.id ? action.employee : employee
			)

		default:
			return employees
	}
}

/* ------------       THUNK CREATORS     ------------------ */

export const fetchEmployees = () => (dispatch) => {
	axios.get('/api/employees').then((res) => dispatch(init(res.data)))
}

export const removeEmployee = (id) => (dispatch) => {
	axios
		.delete(`/api/employees/${id}`)
		.then(() => dispatch(remove(id)))
		.catch((err) => console.error(`Removing employee: ${id} unsuccesful`, err))
}

export const addEmployee = (employee) => (dispatch) => {
	axios
		.post('/api/employees', employee)
		.then((res) => dispatch(create(res.data)))
		.catch((err) =>
			console.error(`Creating employee: ${employee} unsuccesful`, err)
		)
}

export const updateEmployee = (id, employee) => (dispatch) => {
	axios
		.put(`/api/employees/${id}`, employee)
		.then((res) => dispatch(update(res.data)))
		.catch((err) =>
			console.error(`Updating employee: ${employee} unsuccesful`, err)
		)
}
