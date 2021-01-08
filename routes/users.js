const express = require('express')
const bodyParser = require('body-parser')
const { verifyuser } = require('../auth')

const router = express.Router()
router.use(bodyParser.json())

router.get('/', (req, res, next) => {
    verifyuser(req, res, next, 'Nithin Sai', '123456')
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.send("user")
})

module.exports = router