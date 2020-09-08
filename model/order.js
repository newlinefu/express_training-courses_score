const {model, Schema} = require('mongoose')

const order = new Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    user: {
        name: String,
        id: {
            type: Schema.Types.ObjectID,
            ref: 'User',
            required: true
        }
    },
    courses: [
        {
            type: Object,
            required: true
        }
    ]
})

module.exports = model('Order', order)