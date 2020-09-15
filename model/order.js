const {model, Schema} = require('mongoose')

const order = new Schema({
    user: {
        id: {
            type: Schema.Types.ObjectID,
            ref: 'User',
            required: true
        }
    },
    courses: [
        {
            course: {
                type: Object,
                required: true
            },
            count: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
})

module.exports = model('Order', order)