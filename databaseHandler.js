const sqlite3 = require('sqlite3').verbose()
const SqliteToJson = require('sqlite-to-json')

// open database connection
let db = new sqlite3.Database('./database/miniDBMS.sql', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err);
    }
    console.log("Connected to database!");
});

const exporter = new SqliteToJson({
    client: new sqlite3.Database('./database/miniDBMS.sql')
});

// work here



// Breaking action !


// exporter.tables((err, tables) => {
//     if (!err) {
//         var val = []
//         tables.forEach(element => {
//             val.push(element)
//         });
//         for (let i = 0; i < val.length; i++) {
//             const element = val[i];
//             exporter.save(element, `./database/json/${element}.json`, (err) => {
//                 console.error(err);
//             })
//             console.log("Converting: " + i);
//         }
//     }
//     else
//         console.error(err);
// })


module.exports = {

    db,

    sqltoJSON: () => {
        var val = []
        exporter.tables((err, tables) => {
            if (!err)
                tables.forEach(element => {
                    val.push(element)
                });
            else
                console.error(err);
        })
        for (let i = 0; i < val.length; i++) {
            const element = val[index];
            exporter.save(element, `./database/json/${element}.json`, (err) => {
                console.error(err);
            })
            console.log("Converting: " + i);
        }
    },

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

    // queries
    queryAllValues: (sql, params, func) => {
        db.all(sql, params, func)
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

// let insertions = [
//     'INSERT INTO art(name, imageurl, price, rating) VALUES ("Peace", "https://i.pinimg.com/736x/cb/c6/62/cbc662299bd35357e519fe867444b86c.jpg", 22000.0, 3)',
//     'INSERT INTO art(name, imageurl, price, rating) VALUES ("Ocean O Peace", "https://media.architecturaldigest.in/wp-content/uploads/2020/05/oxygen-getty-images-866x487.jpg", 35000.0, 3)',
//     'INSERT INTO art(name, imageurl, price, rating) VALUES ("Simple Globe Jesus", "https://media.architecturaldigest.in/wp-content/uploads/2020/05/Fine-Art-Contributor-christies-866x1274.jpg", 135000.0, 4)',
//     'INSERT INTO art(name, imageurl, price, rating) VALUES ("No Country, Old Men", "https://media.architecturaldigest.in/wp-content/uploads/2020/05/Photo-by-DeAgostini-Getty-Images-866x722.jpg", 35000.0, 2)',
//     'INSERT INTO art(name, imageurl, price, rating) VALUES ("Who art thou?", "https://www.artzyme.com/images/detailed/5/NPAT.jpg", 5000.0, 3)',
//     'INSERT INTO art(name, imageurl, price, rating) VALUES ("Embrace", "https://render.fineartamerica.com/images/rendered/search/print/6/8/break/images-medium-5/emerge-mia-tavonatti.jpg", 95000.0, 4)',
//     'INSERT INTO art(name, imageurl, price, rating) VALUES ("Ladyyard", "https://www.ladyyard.com/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/a/n/animal_head_wall_decoration_home_living_room_european_sculptures_hanging_decorative_rhino_deer_head_resin_wall_decor_statue_33007660500_sale_0.jpg", 35000.0, 4)',
//     'INSERT INTO art(name, imageurl, price, rating) VALUES ("Sothe Byss", "https://www.sothebys.com/content/dam/stb/lots/L18/L18230/122L18230_9DD3D.jpg.webrend.1280.1280.jpeg", 49000.0, 4)',
//     'INSERT INTO art(name, imageurl, price, rating) VALUES ("Lady of Wrath and Despair", "https://www.lequiregallery.com/wp-content/uploads/2018/04/Alan_LeQuire_Seated_Figure_Reading_486x480.jpg", 25500.0, 4)',
//     'INSERT INTO art(name, imageurl, price, rating) VALUES ("Paraoh of Egypt", "https://mymodernmet.com/wp/wp-content/uploads/2017/08/Famous-Sculpture-Nofretete-Neues-Museum.jpg", 126500.0, 4)',
//     'INSERT INTO art(name, imageurl, price, rating) VALUES ("The Lost People", "https://media.timeout.com/images/103323908/image.jpg", 86500.0, 3)',
//     'INSERT INTO art(name, imageurl, price, rating) VALUES ("Deep Death", "https://weandthecolor.com/wp-content/uploads/2013/03/Painting-by-Eric-Lacombe-245345.jpg", 12500.0, 2)',
//     'INSERT INTO art(name, imageurl, price, rating) VALUES ("Blue Abyss", "https://tanjagroos.com/wp-content/uploads/2018/01/Celestial-Oceans-900w.jpg", 52500.0, 3)',
//     'INSERT INTO art(name, imageurl, price, rating) VALUES ("The Sky of the Night", "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/celestial-fred-wilson.jpg", 77500.0, 3)',
//     'INSERT INTO art(name, imageurl, price, rating) VALUES ("Yellow Supper", "https://www.vangoghgallery.com/painting/img/painting_header.jpg", 237500.0, 5)',
//     'INSERT INTO art(name, imageurl, price, rating) VALUES ("Scared Phoenix", "https://i.pinimg.com/originals/f9/5f/06/f95f0681757027a4dce107362f9d557e.jpg", 127500.0, 5)',

// ]


// insertions.forEach(element => {
//     db.run(element)
// });