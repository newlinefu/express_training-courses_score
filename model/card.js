const Course = require('./course')
const path = require('path')
const fs = require('fs')

const pathToDataBase = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
)

class Card {
    static async addCourse(course) {
        const allCard = await Card.getAllCourses()
        const indexOfCandidate = allCard.courses.findIndex(c => c.id === course.id)

        const candidate = allCard.courses[indexOfCandidate]

        if(candidate) {
            candidate.count++
            allCard.courses[indexOfCandidate] = candidate
        } else {
            course.count = 1
            allCard.courses.push(course)
        }

        allCard.totalPrice += +course.price

        return new Promise((resolve, reject) => {
            fs.writeFile(
                pathToDataBase,
                JSON.stringify(allCard),
                (err) => {
                    if(err) reject(err)
                    else resolve()
                }
            )
        })
    }

    static async getAllCourses() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                pathToDataBase,
                (err, data) => {
                    if(err)
                        reject(err)
                    else {
                        resolve(JSON.parse(data))
                    }
                }
            )
        })
    }
}

module.exports = Card