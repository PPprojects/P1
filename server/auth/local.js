const router = require('express').Router()
const HttpError = require('../utils/HttpError')
const { Employee } = require('../db/models')

// This marries the original auth code we wrote to Passport.
// An alternative would be to use the "local strategy" option with Passport.

// login, i.e. "you remember `me`, right?"
// `/login` is optional because the verb and `auth/local` connotate login
router.put('/login', (req, res, next) => {
	const { email, password } = req.body

	Employee.findOne({
		where: { email, password }
	})
		.then((employee) => {
			if (!employee) throw HttpError(404)
			req.login(employee, (err) => {
				if (err) {
					return next(err)
				}
				res.send(employee) // 200 is the default status!
			})
			// req.session.employeeId = employee.id; // from when we just had sessions and no passport
		})
		.catch(next)
})

// signup, i.e. "let `me` introduce myself"
// `/signup` is optional
router.post('/signup', (req, res, next) => {
	const { email, password } = req.body

	Employee.create({
		email,
		password
	})
		.then((employee) => {
			req.login(employee, (err) => {
				if (err) {
					return next(err)
				}
				res.status(201).send(employee) // 201 created makes a lot of sense as a status here!
			})
		})
		.catch(next)
})

// logout, i.e. "please just forget `me`"
// `/logout` is optional
router.delete('/logout', (req, res, next) => {
	req.logout()
	/* Below is from when we just had sessions and no passport */
	// req.session.destroy(); // destroys entire session
	/* Below are alternatives to the above
  delete req.session.employeeId; // deletes one item on session
  req.session.employeeId = null;
  */
	res.sendStatus(204)
})

// check currently-authenticated employee, i.e. "who am I?"
// `/me` is optional
router.get('/me', (req, res, next) => {
	res.send(req.employee)
})

module.exports = router
