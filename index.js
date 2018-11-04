const app = require('./server')
const PORT = process.env.PORT || 1337
const { db } = require('./server/db/models')
const chalkAnimation = require('chalk-animation')

db.sync({ force: false })
	.then(() => {
		chalkAnimation.pulse('Postgres server is up and running...', 1.25)
		app.listen(PORT, (err) => {
			if (err) throw err
			setTimeout(() => chalkAnimation.neon(`Listening on port ${PORT}.`), 2500)
		})
	})
	.catch(console.error)
