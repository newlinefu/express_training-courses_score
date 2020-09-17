const {Router} = require('express')
const router = Router()

router.get('/login', async (req, res) => {
    res.render('auth/auth', {
        isLogin: true
    })
})

router.post('/authorizate', async (req, res) => {
    req.session.isAuthenticated = true
    res.redirect('/')
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login')
    })
})

module.exports = router