const config = require('../config')

class Mail {
    constructor(to, from, subject, html) {
        this.to = to
        this.from = from
        this.subject = subject
        this.html = html
    }
}

class RegistrationMail extends Mail {
    constructor(to) {
        super(
            to,
            config.SENDER_MAIL,
            'registration completed successfully',
            `
                <h2>You have successfully registered in the express shop.</h2> 
                <p>Your login - ${to}.</p>
                <p>Go to the <a href=${config.BASE_URL}>store page</a></p>
            `
        );
    }
}

class ResetMail extends Mail {
    constructor(to, token) {
        super(
            to,
            config.SENDER_MAIL,
            'Password change request Express Shop',
            `
                <h1>You have requested a password change in your personal account.</h1> 
                <p>Ignore this email if you do not want to change your password. 
                To change your password follow the link</p>
                <p><a href="${config.BASE_URL}/auth/pass/reset/${token}">${config.BASE_URL}/auth/pass/reset/${token}</a></p>
            `
        );
    }
}

module.exports = {
    RegistrationMail,
    ResetMail
}