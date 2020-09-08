const {Router} = require('express')
const router = Router()
const Course = require('../model/course')

router.get('/', (req, res) => {
    res.render('put',{
        title: 'Add router',
        isAddCourse: true
    })
})

router.post('/', async (req, res) => {

    const addingCourse = new Course({
        title: req.body.title,
        price: req.body.price,
        imgURL: req.body.imgURL,
        user: req.user
    })

    try {
        await addingCourse.save()
        res.redirect('/all-courses')

    } catch (err) {
        console.log(err)
        res.redirect('/add')
    }

})

module.exports = router