const express = require('express')
const exthbs = require('express-handlebars')

const homeRouter = require('./routes/home_router')
const addRouter = require('./routes/add_router')
const allCoursesRouter = require('./routes/all-courses_router')
const cardRouter = require('./routes/card_router')

const app = express()

const hbs = exthbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'pages')

app.use(express.static('public'))

app.use(express.urlencoded({extended: false}))
app.use('/', homeRouter)
app.use('/add', addRouter)
app.use('/all-courses', allCoursesRouter)
app.use('/card', cardRouter)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})