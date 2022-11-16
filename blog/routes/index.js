var express = require('express');
var router = express.Router();
let dbCon = require("../lib/db");

/* GET home page. */
router.get('/', function(req, res, next) {
    dbCon.query("SELECT * FROM contents ORDER BY id DESC  LIMIT 5", (err, result) => {
        if (err) {
            req.flash("error", err.message);
            console.log(err);
        } else {
            let post = result;
            res.render('index', { title: "Home", post: post, user_login: req.session.user_login });
        }
    });
});

router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'Contact', user_login: req.session.user_login });
});


router.get('/about', function(req, res, next) {
    res.render('about', { title: 'About', user_login: req.session.user_login });
});


router.get('/post/:page', function(req, res, next) {
    var resultPerPage = 5
    var page = req.params.page || 1
    dbCon.query("SELECT * FROM contents", function(err, rows) {
        if (err) throw err;
        if (rows) {
            const numOfResults = rows.length;
            const numberOfPages = Math.ceil(numOfResults / resultPerPage);

            const startingLimit = (page - 1) * resultPerPage;
            if (rows.length > 0) {
                dbCon.query(`SELECT * FROM contents ORDER BY id DESC  LIMIT ${startingLimit}, ${resultPerPage}`, (err, result1) => {
                    if (err) throw err;
                    let iterator = (page - 5) < 1 ? 1 : page - 5;
                    let endingLink = (iterator + 5) <= numberOfPages ? (iterator + 5) : page + (numberOfPages + page);
                    res.render("older_post", {
                        post: result1,
                        page: page,
                        iterator: iterator,
                        endingLink: endingLink,
                        numberOfPages: numberOfPages,
                        title: "Post",
                        user_login: req.session.user_login
                    });
                })
            } else {
                if (err) throw err;
                let iterator = (page - 5) < 1 ? 1 : page - 5;
                let endingLink = (iterator + 5) <= numberOfPages ? (iterator + 5) : page + (numberOfPages + page);
                res.render("older_post", {
                    post: "",
                    page: page,
                    iterator: iterator,
                    endingLink: endingLink,
                    numberOfPages: numberOfPages,
                    title: "Post",
                    user_login: req.session.user_login
                });
            }

        }
    });
});


router.get('/contents/:title', function(req, res, next) {
    let title = req.params.title;
    dbCon.query("SELECT * FROM contents WHERE title = ?", title, (err, result) => {
        if (err) {
            req.flash("error", err.message);
            console.log(err);
        } else {
            console.log(result[0].data);
            let delta = result[0].data;
            let create_at = result[0].create_at;
            let category = result[0].category;
            let description = result[0].description;
            var strdate = new Date(create_at);
            var date = strdate.getDate() + "/" + (strdate.getMonth() + 1) + "/" + strdate.getFullYear();
            res.render('contents', { title: result[0].title, delta: delta, create_at: date, category: category, description: description, user_login: req.session.user_login });
        }
    });
});


router.post('/preferences', function(req, res, next) {
    let title = req.body.title;
    let status = req.body.status;
    let country = req.body.country;
    let category = req.body.category;
    let age = req.body.age;

    let form_data = {
        title: title,
        category: category,
        country: country,
        status: status,
        age: age
    };
    dbCon.query("INSERT INTO preferences SET ?", form_data, (err, result) => {
        if (err) {
            req.flash("error", err.message);
            console.log(err);
        }
    });

});


router.post('/visiting', function(req, res, next) {
    let time = req.body.time;
    let form_data = {
        time: time
    };
    dbCon.query("INSERT INTO visiting SET ?", form_data, (err, result) => {
        if (err) {
            req.flash("error", err.message);
            console.log(err);
        }
    });
});


module.exports = router;