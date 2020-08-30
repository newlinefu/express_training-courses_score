const {Router} = require('express')
const router = Router()
const Course = require('../model/course')
const Card = require('../model/card')

router.post('/', async (req, res) => {
    const course = req.body

    await Card.addCourse({...course})

    res.redirect('/card')
})

router.get('/', (req, res) => {
    res.render('card', {
        title: `My card`,
        isCard: true
    })
})

module.exports = router