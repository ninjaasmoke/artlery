const DataBase = require('better-sqlite3');
const db = new DataBase('foobar.db', { verbose: console.log });

const stmt = db.prepare('SELECT name, age FROM cats');
