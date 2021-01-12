const express = require('express')
const bodyParser = require('body-parser')
const { db } = require('../databaseHandler')

const router = express.Router()
router.use(bodyParser.json())

router.get('/', (req, res, next) => {
    res.status = 200
    res.send("Login!")
    next()
})

router.post('/', (req, res, next) => {
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
                    } else {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ "error": "wrong password" })
                        next()
                    }
                })
                next()
            }
        })
        next()
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ username: null })
        next()
    }
})

module.exports = router