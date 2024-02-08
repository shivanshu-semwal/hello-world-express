// public librares
const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')

// private libraries
// const fortune = require('./lib/fortune')
const handlers = require('./lib/handlers')

const port = process.env.PORT || 3000
const app = express()

// app config

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static(path.join(__dirname, '/public')))
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Express started on http://localhost:${port}` +
      '; press Ctrl-C to terminate.')
  })
} else {
  module.exports = app
}

// app

app.get('/', handlers.home)
app.get('/about', handlers.about)
// custom 404 page
app.use(handlers.notFound)
// custom 500 page
app.use(handlers.serverError)
