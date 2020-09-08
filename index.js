const express = require('express')
const exthbs = require('express-handlebars')
const handlebars = require('handlebars')
const mongoose = require('mongoose')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const User = require('./model/user')

const homeRouter = require('./routes/home_router')
const addRouter = require('./routes/add_router')
const allCoursesRouter = require('./routes/all-courses_router')
const cardRouter = require('./routes/card_router')
const ordersRouter = require('./routes/orders_router')

const app = express()

const hbs = exthbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(handlebars)
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'pages')

app.use(async (req, res, next) => {
    try {
        const userId = '5f565f4f1619ea303456d506'

        req.user = await User.findById(userId)

        next()
    } catch (err) {
        console.log(err)
    }
})
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use('/', homeRouter)
app.use('/add', addRouter)
app.use('/all-courses', allCoursesRouter)
app.use('/card', cardRouter)
app.use('/orders', ordersRouter)


const PORT = process.env.PORT || 3000

async function start() {
    try {
        const pass = 'JS5VwKp1o8jBMnAM'
        const dbDefault = 'shop'
        const url = `mongodb+srv://Alexandr:${pass}@cluster0.odv3t.gcp.mongodb.net/${dbDefault}?retryWrites=true&w=majority`
        await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true })

        const candidate = await User.findOne()
        if(!candidate) {
            const user = new User({
                email: 'newlinefu@gmail.com',
                name: 'Alexandr',
                card: []
            })
            user.save()
        }

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })

    } catch (err) {
        console.log(err)
    }
}

start()