const pass = 'JS5VwKp1o8jBMnAM'
const dbDefault = 'shop'

module.exports = {
    MONGODB_URI: `mongodb+srv://Alexandr:${pass}@cluster0.odv3t.gcp.mongodb.net/${dbDefault}?retryWrites=true&w=majority`,
    SESSION_SECRET_KEY: 'Hello from Alaska',
    SENDGRID_KEY: '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',
    BASE_URL: 'http://localhost:3000',
    SENDER_MAIL: 'stateoftwo@gmail.com'
}