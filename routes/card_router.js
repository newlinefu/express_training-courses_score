const {Router} = require('express')
const router = Router()
const Card = require('../model/card')

router.post('/', async (req, res) => {
    const course = req.body

    await req.user.addToCard({...course})

    res.redirect('/card')
})

router.delete('/delete/:id', async (req, res) => {
    await req.user.deleteFromCard(req.params.id)
    const user = await req.user
        .populate('card.courses.courseId')
        .execPopulate()

    user.card.totalCount = recalculateTotalPrice(user.card)

    await user.save()

    res.status(200).json(JSON.stringify(transformCard(user.card)))
})

router.get('/', async (req, res) => {
    const user = await req.user
        .populate('card.courses.courseId')
        .execPopulate()

    user.card.totalCount = recalculateTotalPrice(user.card)

    await user.save()

    res.render('card', {
        title: `My card`,
        isCard: true,
        card: transformCard(user.card)
    })
})

function transformCard(card) {
    return {
        totalCount: card.totalCount,
        courses: card.courses.map(item => ({
            id: item.courseId._id,
            title: item.courseId.title,
            price: item.courseId.price,
            imgURL: item.courseId.imgURL,
            count: item.count
        }))
    }
}

function recalculateTotalPrice(card) {
    return card.courses.reduce((acc, item) => {
        console.log('price: ' + item.courseId.price)
        console.log('count ' + item.count)
        return acc += item.courseId.price * item.count
    }, 0)
}
module.exports = router