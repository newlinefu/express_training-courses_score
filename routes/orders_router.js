const {Router} = require('express')
const auth = require('../middlewares/auth')
const router = Router()
const Order = require('../model/order')

router.get('/', auth, async (req, res) => {
    try {
        const orders = await Order.find({
            'user.id': req.user._id
        }).populate('user.id')

        res.render('orders', {
            isOrders: true,
            title: 'Orders',
            orders: orders.map(o => {
                return {
                    id: o._id,
                    courses: o.courses,
                    user: o.user,
                    date: o.date,
                    totalPrice: o.courses.reduce((acc, c) => acc += c.count * c.course.price, 0)
                }
            })
        })
    } catch (err) {
        console.log(err)
    }
})

router.post('/', auth, async (req, res) => {
    try {
        const user = await req.user
            .populate('card.courses.courseId')
            .execPopulate()

        const courses = user.card.courses.map(c => {
            return {
                course: {
                    id: c.courseId._id,
                    title: c.courseId.title,
                    price: c.courseId.price,
                },
                count: c.count
            }
        })

        const actualOrder = new Order({
            user: {
                id: user._id
            },
            courses: [...courses]
        })

        await actualOrder.save()
        await user.clearCard()

        res.redirect('/orders')

    } catch (err) {
        console.log(err)
    }
})

module.exports = router