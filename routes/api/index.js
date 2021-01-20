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

router.get('/getrating/:artname', (req, res, next) => {
    db.all('SELECT rating FROM rating WHERE artname = ?', [req.params.artname], (err, row) => {
        if (!err) {
            if (row) {
                res.statusCode = 200
                return res.send(row)
            } else {
                res.statusCode = 404
                return res.json({})
            }
        } else {
            res.statusCode = 200
            return res.send({ "error": "Internal error", "err": err })
        }
    })
})

router.get('/getratingid', (req, res, next) => {
    db.all('select rating_id from rating', [], (err, rows) => {
        if (err) {
            res.status = 200;
            res.setHeader('Content-Type', 'application/json')
            console.error(err);
            return res.json({ "error": "Some internal error", "err": err });
        } else {
            res.status = 200;
            res.setHeader('Content-Type', 'application/json')
            console.log(rows);
            return res.send(rows)
        }
    })
})

router.post('/postrating', (req, res, next) => {
    const rating = req.body.rating
    const artname = req.body.artname
    const username = req.body.username
    const id = req.body.id
    if (rating !== undefined && username !== undefined && artname !== undefined) {
        db.run(`INSERT INTO rating(artname, username, rating, rating_id) values ("${artname}", "${username}", ${rating}, ${id})`, [], (err) => {
            if (err) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                console.error(err);
                return res.json({ "error": "Some internal error", "err": err });
            } else {
                res.status = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.send(req.body)
            }
        })
    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.send({ "error": "Fill all details!" })
    }
})

router.get('/getcomment/:artname', (req, res, next) => {
    db.all('SELECT * FROM comments WHERE artname = ?', [req.params.artname], (err, row) => {
        if (!err) {
            if (row) {
                // console.log(row);
                res.statusCode = 200
                return res.send(row)
            } else {
                res.statusCode = 200
                return res.send([])
            }
        } else {
            res.statusCode = 200
            return res.send({ "error": "Internal database error", "err": err })
        }
    })
})

router.get('/getcommentid', (req, res, next) => {
    db.all('select comment_id from comments', [], (err, rows) => {
        if (err) {
            res.status = 200;
            res.setHeader('Content-Type', 'application/json')
            console.error(err);
            return res.json({ "error": "Some internal error", "err": err });
        } else {
            res.status = 200;
            res.setHeader('Content-Type', 'application/json')
            // console.log(rows);
            return res.send(rows)
        }
    })
})

router.post('/postcomment', (req, res, next) => {
    const comment = req.body.comment
    const artname = req.body.artname
    const username = req.body.username
    const id = req.body.id
    if (comment !== undefined && username !== undefined && artname !== undefined) {
        db.run(`INSERT INTO comments(artname, username, comment, comment_id) values ("${artname}", "${username}", "${comment}", ${id})`, [], (err) => {
            if (err) {
                res.statusCode = 200;
                console.error(err);
                res.setHeader('Content-Type', 'application/json')
                return res.send({ "error": "Some internal error", "err": err });
            } else {
                res.status = 200;
                res.setHeader('Content-Type', 'application/json');
                console.log("we are in");
                return res.send(req.body)
            }
        })
    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.send({ "error": "Fill all details!" })
    }
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

router.post('/createart', (req, res, next) => {
    const name = req.body.artname;
    const imageurl = req.body.imageurl;
    const price = req.body.price;
    const about = req.body.about;
    const artist = req.body.artist;
    if (name !== undefined && imageurl !== undefined && price !== undefined && about !== undefined) {
        db.all(`select * from art where name="${name}"`, [], (err, rows) => {
            console.log("In api/index/db");
            if (err) {
                console.error(err);
                res.status = 200;
                return res.json({ "error": "There is a database error", "err": err });
            } else if (rows.length === 0) {
                console.log(rows);
                db.run(`INSERT INTO art(name, imageurl, price, artist, about) VALUES ("${name}", "${imageurl}", ${price}, "${artist}", "${about}")`, [], (err) => {
                    if (err) {
                        console.error(err);
                        res.status = 200;
                        return res.json({ "error": "There is a database error", "err": err });
                    } else {
                        console.log("Successfully added new art!");
                        res.status = 200;
                        return res.send(req.body);
                    }
                })
            }
            else {
                res.status = 200;
                return res.json({ "error": "Art name already exists!" });
            }
        })

    } else {
        console.log("Details missing");
        return res.send({ "error": "Fill all details!" })
    }
    return
})

router.post('/placeorder', (req, res, next) => {
    const username = req.body.username;
    const artname = req.body.artname;
    const address = req.body.address;
    const booked = req.body.booked;
    const due = req.body.due;
    if (username !== undefined && artname !== undefined && address !== undefined && booked !== undefined && due != undefined) {
        console.log("Buying: " + artname);
        const sql = `INSERT INTO orders (username, artname, address, booked, due) VALUES ("${username}", "${artname}", "${address}", "${booked}", "${due}")`;
        console.log(sql);
        db.run(sql,
            [], (err) => {
                if (err) {
                    console.error(err);
                    res.status = 200;
                    return res.json({ "error": "Internal database error", "err": err });
                } else {
                    res.status = 200;
                    return res.send(req.body);
                }
            })
    } else {
        return res.send({ "error": "Fill all details!" })
    }
})

router.post('/getpostedart', (req, res, next) => {
    const username = req.body.username;
    if (username !== undefined) {
        db.all(`select * from art where artist="${username}"`, [], (err, rows) => {
            if (err) {
                console.error(err);
                res.status = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.json({ "error": "Internal database error", "err": err });
            } else {
                res.status = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.send(rows);
            }
        })
    }
})

router.post('/listorders', (req, res, next) => {
    const username = req.body.username;
    if (username !== undefined) {
        db.all(`select * from orders where username="${username}"`, [], (err, rows) => {
            if (err) {
                console.error(err);
                res.status = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.json({ "error": "Internal database error", "err": err });
            } else {
                res.status = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.send(rows);
            }
        })
    } else {
        return res.json({ "error": "Missing User!" })
    }
})

router.post('/listdeliveries', (req, res, next) => {
    const artist = req.body.artist;
    if (username !== undefined) {
        db.all(`select * from orders where artist="${artist}"`, [], (err, rows) => {
            if (err) {
                console.error(err);
                res.status = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.json({ "error": "Internal database error", "err": err });
            } else {
                res.status = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.send(rows);
            }
        })
    } else {
        return res.json({ "error": "Missing User!" })
    }
})

module.exports = router