const {Router} = require('express')
const User = require('../model/user')
const bcrypt = require('bcrypt')
const router = Router()

router.get('/login', async (req, res) => {
    res.render('auth/auth', {
        isLogin: true
    })
})

router.post('/authorizate', async (req, res) => {
    try {
        const {email, pass} = req.body
        const candidate = await User.findOne( { email } )
        if(candidate) {
            if(await bcrypt.compare(pass, candidate.pass)) {
                req.session.user = candidate
                req.session.isAuthenticated = true
                req.session.save(err => {
                    if (err) {
                        throw err
                    } else {
                        res.redirect('/')
                    }
                })
            } else {
                res.redirect('/auth/login#authorizate')
            }
        } else {
            res.redirect('/auth/login#authorizate')
        }
    } catch (err) {
        console.log(err)
    }
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        delete req.user
        res.redirect('/auth/login')
    })
})

router.post('/registrate', async (req, res) => {
    try {
        const {name, pass, rep_pass, email} = req.body
        const candidate = await User.findOne({
            'email': email
        })
        if (candidate)
            res.redirect('/auth/login#registrate')
        else {
            const user = new User({
                name, email, pass: (await bcrypt.hash(pass, 10)), card: []
            })
            await user.save()
            res.redirect('/auth/login#authorizate')
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = router