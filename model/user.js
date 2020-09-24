const {model, Schema} = require('mongoose')

const user = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tokenPassword: String,
    tokenExp: Date,
    pass: {
        type: String,
        required: true
    },
    card: {
        courses: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                courseId: {
                    type: Schema.Types.ObjectID,
                    ref: 'Course',
                    required: true
                }
            }
        ],
        totalCount: 0
    }
})

user.methods.addToCard = function (course) {
    const card = {...this.card}
    const courseIndex = card.courses.findIndex(item => item.courseId.toString() === course.id.toString())

    if (courseIndex >= 0) {
        card.courses[courseIndex].count = card.courses[courseIndex].count + 1
    } else {
        card.courses.push({...course, courseId: course.id})
    }

    this.card = card

    return this.save()
}

user.methods.deleteFromCard = function(id) {
    const card = {...this.card}
    const idx = card.courses.findIndex(c => c.courseId.toString() === id.toString())

    if(card.courses[idx].count === 1) {
        card.courses = card.courses.filter(c => c.courseId.toString() !== id.toString())
    } else {
        card.courses[idx].count = card.courses[idx].count - 1
    }
    this.card = card

    return this.save()
}

user.methods.clearCard = function() {
    this.card = {courses: []}
    return this.save()
}

module.exports = model('User', user)