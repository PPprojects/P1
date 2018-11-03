import { combineReducers } from 'redux'
import employees from './employees'
import departments from './departments'
import currentEmployee from './auth'

export default combineReducers({ employees, departments, currentEmployee })
