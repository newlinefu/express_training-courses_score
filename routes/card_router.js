const {Router} = require('express')
const router = Router()
const Course = require('../model/course')
const Card = require('../model/card')

router.post('/', (req, res) => {
    const id = req.body.id

    Card.add(id)

    res.redirect('/card')
})

router.get('/', (req, res) => {
    res.render('card', {
        title: `My card`,
        isCard: true
    })
})

module.exports = router