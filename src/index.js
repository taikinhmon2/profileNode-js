const express = require('express')
const handlebars = require('express-handlebars')
const morgan = require('morgan')
const path = require('path')
const route = require('./routes')
const methodOverride = require('method-override')
const sortMiddleWare = require('./app/midleware/sortMidle')

const db = require('./app/config/db')
// connect db
db.connect()

const app = express()
const port = 3000
const { engine } = handlebars

app.use(methodOverride('_method')) //override post --> put

//  lấy được req.body trong phương thức post,put,patch,delete
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())


//custom middleWare
app.use(sortMiddleWare)

app.use(express.static(path.join(__dirname, 'public')))


// app.use(morgan('combined')) //http logger
//template engine
app.engine('hbs', engine({
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b,
    sortCourse: (field, sort) => {
      const currentType = field === sort.colum ? sort.type :'default'
      const icons = {
        default: 'bi bi-funnel-fill',
        asc: 'bi bi-sort-alpha-down',
        desc: 'bi bi-sort-alpha-down-alt'
      }
      const types = {
        default: 'desc',
        asc: 'desc',
        desc: 'asc'
      }
      const icon = icons[currentType]
      const type = types[currentType]
      return `<a href="/my/courses/?_sort&colum=${field}&type=${type}">
      <i class = "${icon} fs-4"></i>
      </a>`
    }
  }
}))

app.set('view engine', 'hbs')

app.set('views', path.join(__dirname, 'resources', 'views'));
route(app)
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})