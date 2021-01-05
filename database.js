const sqlite3 = require('sqlite3').verbose()

// open database connection
let db = new sqlite3.Database('./database/miniDBMS.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err);
    }
    console.log("Connected to database!");
});

// work here

// Normal Create
// db.run('CREATE TABLE books(name varchar2(10))'); // once, db created, throws an error on 2nd run


// Normal Input
// db.run('INSERT INTO books(name) VALUES(?)', ['The monk who sold his Ferrari'], (err) => {
//     if (err) console.error(err);
//     console.log("Inserted!");
// })

// Multi input
// let books = ['Krishna Key', 'The Lost Symbol', '3 Mistakes of my Life', 'Who will cry when you die?']

// let placeholders = books.map((book) => '(?)').join(',')
// let sql = 'INSERT into books(name) VALUES' + placeholders
// db.run(sql, books, (err) => {
//     if (err) console.error(err);
//     console.log(`Inserted!`);
// })

// Normal query
// db.all('SELECT DISTINCT Name name from books', [], (err, rows) => {
//     if (err) console.error(err);
//     rows.forEach((row) => {
//         console.log(row.name);
//     })
// })



module.exports = {
    // create table
    createTable: (sql) => {
        try {
            db.run(sql)
        } catch (error) {
            console.error(error);
        }
    },

    // insert values into table
    insertValues: (sql, params, err) => {
        db.run(sql, params, err)
    },

    // close database connection
    closeDB: () => {
        db.close((err) => {
            if (err) {
                return console.error(err);
            }
            console.log("Closed database connection!");
        })
    }
}