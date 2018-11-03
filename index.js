const app = require('./server')
const PORT = process.env.PORT || 1337
const { db } = require('./server/db/models')
const chalk = require('chalk')

db.sync({ force: false })
	.then(() => {
		console.log(chalk.black.bgMagenta('Postgres server is up and running...'))
		app.listen(PORT, (err) => {
			if (err) throw err
			console.log(chalk.black.bgMagenta(`Server is listening on port ${PORT}.`))
		})
	})
	.catch(console.error)
