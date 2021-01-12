var express = require('express')
const { db } = require('../../databaseHandler')
var router = express.Router()

router.get('/gallery', (req, res, next) => {
    var galleryData = require('../../database/json/art.json')
    if (galleryData) {
        res.statusCode = 200
        res.json(galleryData)
        res.end
        console.log("Successfully sent data");
    } else {
        // sqltoJSON()
        res.statusCode = 501
        res.send("Some error! Try again")
        res.end
        console.error("Some error try again");
    }
})

router.get('/search/:name', (req, res, next) => {
    db.get('SELECT * FROM art WHERE name = ?', [req.params.name], (err, row) => {
        if (!err) {
            console.log(row);
            if (row) {
                res.statusCode = 200
                res.json({
                    'name': row.name,
                    'url': row.imageurl,
                    'rating': row.rating,
                    'price': row.price
                })
            } else {
                res.statusCode = 404
                res.json({})
            }
        } else {
            res.statusCode = 501
            res.send(err)
            next(err)
        }
    })
})

router.get('/orders')

router.post('/login', (req, res, next) => {
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

module.exports = router