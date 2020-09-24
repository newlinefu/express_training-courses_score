const {Router} = require('express')
const mailManager = require('../mail/Mail')
const config = require('../config')
const User = require('../model/user')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const sendgrid = require('nodemailer-sendgrid-transport')
const bcrypt = require('bcrypt')
const router = Router()

const transporter = nodemailer.createTransport(sendgrid({
    auth: {
        api_key: config.SENDGRID_KEY
    }
}))

router.get('/login', async (req, res) => {
    res.render('auth/auth', {
        isLogin: true,
        authError: req.flash('authError'),
        regError: req.flash('regError')
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
                req.flash('authError', 'Wrong login or password')
                res.redirect('/auth/login#authorizate')
            }
        } else {
            req.flash('authError', 'wrong login or password')
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
        if (candidate) {
            req.flash('regError', 'User with the same email already exists')
            res.redirect('/auth/login#registrate')
        }
        else {
            const user = new User({
                name, email, pass: (await bcrypt.hash(pass, 10)), card: []
            })
            await user.save()
            res.redirect('/auth/login#authorizate')
            await transporter.sendMail(new mailManager.RegistrationMail(email))
        }
    } catch (err) {
        console.log(err)
    }
})

router.get('/pass/reset', (req, res) => {
    res.render('auth/reset', {
        title: 'Reset password',
        resetError: req.flash('resetError')
    })
})

router.post('/pass/reset', (req, res) => {
    try {
        crypto.randomBytes(32, async (err, buffer) => {
            if(err) {
                req.flash('authError', 'Something goes wrong')
                res.redirect('/auth/login#authorizate')
            }

            const token = buffer.toString('hex')
            const candidate = User.findOne({
                email: req.body.email
            })

            if(candidate) {
                await transporter.sendMail(new mailManager.ResetMail(candidate.email, token))
                candidate.tokenPassword = token
                candidate.tokenExp = Date.now() + 1000 * 60 * 60
                await candidate.save()
                res.redirect('/auth/login#authorizate')
            } else {
                req.flash('resetError', 'User with the same login not found')
                res.redirect('auth/pass/reset')
            }
        })
    } catch (err) {
        console.log(err)
    }
})
module.exports = router