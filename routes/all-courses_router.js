const {Router} = require('express')
const router = Router()
const Course = require('../model/course')

router.get('/', async (req, res) => {
    const courses = await Course.find()

    res.render('all-courses', {
        title: 'All courses',
        isAllCourses: true,
        courses
    })
})

router.get('/:id/edit-course', async (req, res) => {
    if(!req.query.allow)
        return res.redirect('/all-courses')
    else {
        const course = await Course.findById(req.params.id)

        res.render('edit-course', {
            title: `Edit ${course.title}`,
            course
        })
    }
})

router.post('/edit-course', async (req, res) => {
    const {id} = req.body
    delete req.body.id
    await Course.findByIdAndUpdate(id, req.body)

    res.redirect('/all-courses')
})

router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id)

    res.render('course', {
        layout: 'empty',
        title: `${course.title} course`,
        course
    })
})

router.post('/delete-course', async (req, res) => {
    try {
        await Course.deleteOne({
            _id: req.body.id
        })
        res.redirect('/all-courses')
    } catch (err) {
        console.log(err)
        res.redirect('/all-courses/edit-course')
    }
})

module.exports = router