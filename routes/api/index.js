var express = require('express')
const { db } = require('../../databaseHandler')
var router = express.Router()

router.get('/gallery', (req, res, next) => {
    // var galleryData = require('../../database/json/art.json')
    // if (galleryData) {
    //     res.statusCode = 200
    //     res.json(galleryData)
    //     return
    // } else {
    //     // sqltoJSON()
    //     res.statusCode = 501
    //     res.send("Some error! Try again")
    //     return
    // }
    db.all('select * from art', [], (err, rows) => {
        if (err) {
            res.statusCode = 200
            res.json({ "error": err })
            return
        } else {
            res.status = 200
            res.setHeader('Content-Type', 'application/json')
            return res.send(rows)

        }
    })
})

router.get('/search/:name', (req, res, next) => {
    db.get('SELECT * FROM art WHERE name = ?', [req.params.name], (err, row) => {
        if (!err) {
            console.log(row);
            if (row) {
                res.statusCode = 200
                return res.send(row)
            } else {
                res.statusCode = 404
                return res.json({})
            }
        } else {
            res.statusCode = 501
            return res.send(err)
        }
    })
})

router.get('/orders')

router.post('/user', (req, res, next) => {
    const username = req.body.username
    console.log("body.username: " + username);
    if (username !== undefined) {
        db.get('select * from user where username=?', [username], (err, row) => {
            if (err) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                console.error(err);
                res.json({ "error": "Username not found", "err": err });
                return;
            } else {
                if (row !== undefined) {
                    res.status = 200;
                    res.setHeader('Content-Type', 'plain/text');
                    return res.send(row)
                }
                else {
                    console.error("Username does not exist");
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    return res.json({ "error": "Username does not exist" })
                }
            }
        })
    } else {
        res.status = 404
        return
    }
})

router.post('/login', (req, res, next) => {
    const username = req.body.username
    console.log("body.username: " + username);
    if (username !== undefined) {
        db.get('select * from user where username=?', [username], (err, row) => {
            if (err) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                console.error(err);
                res.json({ "error": "Username not found", "err": err });
                return;
            } else {
                const password = req.body.password;
                console.log(password);
                if (row !== undefined)
                    if (row.password === password) {
                        res.clearCookie("username")
                        console.log('Verified user: ' + row.username + '!');
                        res.cookie("username", username)
                        res.status = 200;
                        res.setHeader('Content-Type', 'application/json');
                        return res.json({ "username": username })
                    } else {
                        console.error("password wrong");
                        res.status = 200;
                        res.setHeader('Content-Type', 'application/json');
                        return res.json({ "error": "Wrong Password" })
                    }
                else {
                    console.error("Username doest not exist");
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    return res.json({ "error": "Username does not exist" })
                }
            }
        })
    } else {
        res.status = 200;
        res.setHeader('Content-Type', 'application/json');
        console.error("No user name");
        return res.json({ "error": "no user name" })
    }
})

router.get('/logout', (req, res, next) => {
    console.log(req.cookies);
    res.cookie("username", null)
    res.status = 200
    res.json({ "logout": "successful" })
    return res.redirect("/")
})

router.post('/register', (req, res, next) => {
    const sql = req.body.sql;
    const username = req.body.username;
    if (sql !== undefined && username !== undefined) {
        console.log(sql);
        db.get('select * from user where username=?', [username], (err, row) => {
            if (err) {
                res.status = 200
                return res.json({ "error": err })
            } else {
                if (row !== undefined) {
                    res.status = 200
                    return res.send({ "error": "Username already exists! Try to login" })
                } else {
                    db.run(sql, [], (err) => {
                        if (err) {
                            res.status = 200;
                            res.setHeader('Content-Type', 'application/json');
                            console.error(err);
                            return res.json({
                                "error": "invalid sql or username missing in body",
                                "err": err
                            })
                        } else {
                            db.get('select * from user where username=?', [username], (err, row) => {
                                if (err) {
                                    res.status = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    return res.json({
                                        "error": err
                                    })
                                } else {
                                    res.clearCookie("username")
                                    console.log('Verified user: ' + username + '!');
                                    res.cookie("username", username)
                                    res.status = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    return res.send(row)
                                }
                            })
                        }
                    })
                }
            }
        })
    }
})




module.exports = router