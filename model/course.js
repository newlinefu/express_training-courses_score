const uuid = require('uuid').v4
const path = require('path')
const fs = require('fs')
const pathToData = path.join(__dirname, '../', 'data', 'courses.json')

class Course {
    constructor(title, price, imgURL) {
        this.title = title
        this.price = price
        this.imgURL = imgURL
        this.id = uuid()
    }

    async add() {
        const allCourses = await Course.readData()
        allCourses.push(this)

        return new Promise((resolve, reject) => {
            fs.writeFile(
                pathToData,
                JSON.stringify(allCourses),
                (err) => {
                    if(err) reject(err)
                    else resolve()
                }
            )
        })
    }

    static async update(course) {
        const allData = await Course.readData()
        const index = allData.findIndex(item => course.id === course.id)

        allData[index] = course

        return new Promise((resolve, reject) => {
            fs.writeFile(
                pathToData,
                JSON.stringify(allData),
                err => {
                    if (err) reject(err)
                    else resolve()
                }
            )
        })
    }

    static readData() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                pathToData,
                (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(data))
                    }
                }
            )
        })
    }

    static async getDataById(id) {
        const allData = await Course.readData()

        return allData.find(course => course.id === id)
    }
}

module.exports = Course