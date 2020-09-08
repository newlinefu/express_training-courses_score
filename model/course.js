const {model, Schema} = require('mongoose')

const course = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imgURL: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectID,
        required: true,
        ref: 'User'
    }
})

module.exports = model('Course', course)

