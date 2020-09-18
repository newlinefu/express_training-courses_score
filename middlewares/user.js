const User = require('../model/user')

module.exports = async function (req, res, next) {

    if (req.session.user) {
        req.user = await User.findById(req.session.user._id)
    }

    return next()
}