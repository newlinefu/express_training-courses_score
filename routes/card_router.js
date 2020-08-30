const {Router} = require('express')
const router = Router()
const Card = require('../model/card')

router.post('/', async (req, res) => {
    const course = req.body

    await Card.addCourse({...course})

    res.redirect('/card')
})

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    const resultCard = await Card.deleteById(id)

    res.status(200).json(resultCard)
})

router.get('/', async (req, res) => {
    const card = await Card.getAllData()
    res.render('card', {
        title: `My card`,
        isCard: true,
        card: card
    })
})

module.exports = router