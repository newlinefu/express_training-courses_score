const {Router} = require('express')
const router = Router()
const Course = require('../model/course')

router.get('/', async (req, res) => {
    const courses = await Course.readData()

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
        const course = await Course.getDataById(req.params.id)

        res.render('edit-course', {
            title: `Edit ${course.title}`,
            course
        })
    }
})

router.post('/edit-course', async (req, res) => {
    const course = req.body

    await Course.update(course)

    res.redirect('/all-courses')
})

router.get('/:id', async (req, res) => {
    const course = await Course.getDataById(req.params.id)

    res.render('course', {
        layout: 'empty',
        title: `${course.title} course`,
        course
    })
})

module.exports = router