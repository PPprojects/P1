const router = require('express').Router()
const HttpError = require('../utils/HttpError')
const { Department, Employee } = require('../db/models')

router.param('id', (req, res, next, id) => {
	Department.findById(id)
		.then((department) => {
			if (!department) throw HttpError(404)
			req.department = department
			next()
		})
		.catch(next)
})

router.get('/', (req, res, next) => {
	Department.scope('populated')
		.findAll({})
		.then((departments) => res.json(departments))
		.catch(next)
})

router.post('/', (req, res, next) => {
	Department.create(req.body)
		.then((department) =>
			department.reload(Department.options.scopes.populated())
		)
		// .then((departmentIncludingAuthor) => res.status(201).json(departmentIncludingAuthor))
		.then((deptWithEmpl) => res.status(201).json(deptWithEmpl))
		.catch(next)
})

router.get('/:id', (req, res, next) => {
	req.department
		.reload(Department.options.scopes.populated())
		.then((department) => res.json(department))
		.catch(next)
})

router.put('/:id', (req, res, next) => {
	req.department
		.update(req.body)
		.then((department) =>
			department.reload(Department.options.scopes.populated())
		)
		// .then((departmentIncludingAuthor) => res.json(departmentIncludingAuthor))
		.then((deptWithEmpl) => res.json(deptWithEmpl))
		.catch(next)
})

router.delete('/:id', (req, res, next) => {
	req.department
		.destroy()
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router
