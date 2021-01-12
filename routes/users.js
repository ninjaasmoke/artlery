const express = require('express')
const bodyParser = require('body-parser')
const { db } = require('../databaseHandler')

const userLoginRouter = express.Router()
userLoginRouter.use(bodyParser.json())

userLoginRouter.get('/', (req, res, next) => {
    res.status = 200
    res.send("Login!")
    next()
})

userLoginRouter.post('/login', (req, res, next) => {
    const username = req.body.username
    console.log("body.username: " + username);
    if (username !== undefined) {
        db.all('select * from user where username=?', [username], (err, rows) => {
            if (err) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.json({ username: null })
                next()
            } else {
                const password = req.body.password
                rows.forEach((row) => {
                    if (row.password === password) {
                        console.log('Verified user: ' + row.username + '!');
                        res.cookie("username", username)
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ username: row.username })
                        return res.redirect("/")
                    } else {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ "error": "wrong password" })
                        next()
                    }
                })
            }
        })
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ username: null })
        next()
    }
})

module.exports = userLoginRouter