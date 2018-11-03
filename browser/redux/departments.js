import axios from 'axios'
import { REMOVE as REMOVE_EMPLOYEE } from './employees'

/* -----------------    ACTION TYPES    ------------------ */

const INITIALIZE = 'INITIALIZE_DEPARTMENTS'
const CREATE = 'CREATE_DEPARTMENT'
const UPDATE = 'UPDATE_DEPARTMENT'
const REMOVE = 'REMOVE_DEPARTMENT'

/* ------------    ACTION CREATORS      ------------------ */

const init = (departments) => ({ type: INITIALIZE, departments })
const create = (department) => ({ type: CREATE, department })
const remove = (id) => ({ type: REMOVE, id })
const update = (department) => ({ type: UPDATE, department })

/* ------------         REDUCER         ------------------ */

export default function reducer(departments = [], action) {
	switch (action.type) {
		case INITIALIZE:
			return action.departments

		case CREATE:
			return [action.department, ...departments]

		case REMOVE:
			return departments.filter((department) => department.id !== action.id)

		case REMOVE_EMPLOYEE:
			return departments.filter(
				(department) => department.author_id !== action.id
			)

		case UPDATE:
			return departments.map(
				(department) =>
					action.department.id === department.id
						? action.department
						: department
			)

		default:
			return departments
	}
}

/* ------------       THUNK CREATORS     ------------------ */

export const fetchDepartments = () => (dispatch) => {
	axios
		.get('/api/departments')
		.then((res) => dispatch(init(res.data)))
		.catch((err) => console.error('Fetching departments unsuccessful', err))
}

export const removeDepartment = (id) => (dispatch) => {
	axios
		.delete(`/api/departments/${id}`)
		.then(() => dispatch(remove(id)))
		.catch((err) =>
			console.error(`Removing department: ${id} unsuccessful`, err)
		)
}

export const addDepartment = (department) => (dispatch) => {
	axios
		.post('/api/departments', department)
		.then((res) => dispatch(create(res.data)))
		.catch((err) =>
			console.error(`Creating department: ${department} unsuccessful`, err)
		)
}

export const updateDepartment = (id, department) => (dispatch) => {
	axios
		.put(`/api/departments/${id}`, department)
		.then((res) => dispatch(update(res.data)))
		.catch((err) =>
			console.error(`Updating department: ${department} unsuccessful`, err)
		)
}
