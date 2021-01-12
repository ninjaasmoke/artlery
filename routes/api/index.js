var express = require('express')
const { db } = require('../../databaseHandler')
var router = express.Router()

router.get('/gallery', (req, res, next) => {
    var galleryData = require('../../database/json/art.json')
    if (galleryData) {
        res.statusCode = 200
        res.json(galleryData)
        return
        console.log("Successfully sent data");
    } else {
        // sqltoJSON()
        res.statusCode = 501
        res.send("Some error! Try again")
        return
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
        db.get('select * from user where username=?', [username], (err, row) => {
            if (err) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json')
                console.error(err);
                res.json({ "error": "Username not found" });
                return;
            } else {
                const password = req.body.password;
                console.log(password);
                if (row.password === password) {
                    res.clearCookie("username")
                    console.log('Verified user: ' + row.username + '!');
                    res.cookie("username", username)
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    return res.redirect("/")
                } else {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'application/json');
                    return res.json({ "error": "wrong password" })
                }
            }
        })
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        console.error("No user name");
        return res.json({ "error": "no user name" })
    }
})

router.get('/logout', (req, res, next) => {
    console.log(req.cookies);
    res.cookie("username", null)
    res.status = 200
    return res.redirect("/")
})

router.post('/register', (req, res, next) => {
    const sql = req.body.sql;
    const username = req.body.username;
    if (sql !== undefined && username !== undefined) {
        console.log(sql);
        db.run(sql, [], (err) => {
            if (err) {
                res.status = 400;
                res.setHeader('Content-Type', 'application/json');
                console.error(err);
                return res.json({
                    "error": "invalid sql or username missing in body",
                    "err": err
                })
            } else {
                db.get('select * from user where username=?', [username], (err, rows) => {
                    if (err) {
                        res.status = 400;
                        res.setHeader('Content-Type', 'application/json');
                        return res.json({
                            "error": err
                        })
                    } else {
                        res.clearCookie("username")
                        console.log('Verified user: ' + username + '!');
                        res.cookie("username", username)
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        return res.redirect("/")
                    }
                })
            }
        })
    }
})




module.exports = router