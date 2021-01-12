const { queryAllValues } = require('./databaseHandler')

module.exports = {

    verifyuser: (username, password) => {
        var value
        queryAllValues(`select * from user where username=?`, [username], (err, rows) => {
            if (err) {
                console.error(err);
            }
            rows.forEach((row) => {
                if (row.password === password) {
                    console.log('Verified user: ' + row.username + '!');
                }
            })
            return value
        })
        return value
    }
}