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
    const addingCourse = new Course(req.body.title, req.body.price, req.body.img)
    await addingCourse.add()
    res.redirect('/all-courses')
})

module.exports = router