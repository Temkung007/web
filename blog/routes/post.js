var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
let dbCon = require("../lib/db");

const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'public/images',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() +
                path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 10000000 // 100000000 Bytes = 100 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|JPG)$/)) {
            // upload only png and jpg format
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})



/* GET users listing. */
router.get('/post', function(req, res, next) {
    if (req.session.user_login) {
        res.render('admin/post', { title: 'Post', user_login: req.session.user_login });
    } else {
        res.redirect("/");
    }
});

router.get('/post-manage/:page', function(req, res, next) {
    if (req.session.user_login) {
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
                        res.render("admin/manage_post", {
                            post: result1,
                            page: page,
                            iterator: iterator,
                            endingLink: endingLink,
                            numberOfPages: numberOfPages,
                            title: "Post Manage",
                            user_login: req.session.user_login
                        });
                    })
                } else {
                    if (err) throw err;
                    let iterator = (page - 5) < 1 ? 1 : page - 5;
                    let endingLink = (iterator + 5) <= numberOfPages ? (iterator + 5) : page + (numberOfPages + page);
                    res.render("admin/manage_post", {
                        post: "",
                        page: page,
                        iterator: iterator,
                        endingLink: endingLink,
                        numberOfPages: numberOfPages,
                        title: "Post Manage",
                        user_login: req.session.user_login
                    });
                }

            }
        });
    } else {
        res.redirect("/");
    }
});

router.get('/delete/post/:id', function(req, res, next) {
    if (req.session.user_login) {
        let id = req.params.id;
        dbCon.query("SELECT * FROM contents WHERE id = ?", id, (err, result) => {
            if (err) throw err;
            try {
                fs.unlinkSync(__dirname + "/../public/" + result[0].img_url);

                console.log("File is deleted.");
            } catch (error) {
                console.log(error);
            }
        });

        dbCon.query("DELETE FROM contents WHERE id = ?", id, (err, result) => {
            if (err) throw err;
        });
        req.flash("success", "delete!!");
        res.redirect("/post-manage/1");
    } else {
        res.redirect("/");
    }


});

router.get('/post-image/:title', function(req, res, next) {
    if (req.session.user_login) {
        let title = req.params.title;
        res.render('admin/post1', { title: 'Post Image', tt: title, user_login: req.session.user_login });
    } else {
        res.redirect("/");
    }

});

router.get('/post-edit/:title', function(req, res, next) {
    if (req.session.user_login) {
        let title = req.params.title;
        dbCon.query("SELECT * FROM contents WHERE title = ?", title, (err, result) => {
            if (err) {
                req.flash("error", err.message);
                console.log(err);
            } else {
                let delta = result[0].data;
                let create_at = result[0].create_at;
                let category = result[0].category;
                let description = result[0].description;
                var strdate = new Date(create_at);
                var date = strdate.getDate() + "/" + (strdate.getMonth() + 1) + "/" + strdate.getFullYear();
                res.render('admin/edit_post', { title: result[0].title, delta: delta, create_at: date, category: category, description: description, user_login: req.session.user_login });
            }
        });
    } else {
        res.redirect("/");
    }
});


router.post('/add-post-image/:title', imageUpload.single('image'), function(req, res, next) {
    if (req.session.user_login) {
        let file = req.file;
        let url = "images/" + file.filename;
        let title = req.params.title;

        dbCon.query("UPDATE contents SET img_url = ? WHERE title = ?", [url, title], (err, result) => {
            if (err) {
                req.flash("error", err.message);
                console.log(err);
            } else {
                req.flash("success", "Post success");
                res.redirect("/post");
            }
        });
    } else {
        res.redirect("/");
    }


});


router.post('/add-post', function(req, res, next) {
    if (req.session.user_login) {
        let data = JSON.parse(req.body.data);
        let title = req.body.title;
        let description = req.body.description;
        let category = req.body.category;
        data = JSON.stringify(data);
        data = data.toString();

        let form_data = {
            title: title,
            description: description,
            data: data,
            category: category
        };
        dbCon.query("INSERT INTO contents SET ?", form_data, (err, result) => {
            if (err) {
                req.flash("error", err.message);
                console.log(err);
            }
        });
    } else {
        res.redirect("/");
    }

});


router.post('/update-post', function(req, res, next) {
    if (req.session.user_login) {
        let data = JSON.parse(req.body.data);
        let title = req.body.title;
        let description = req.body.description;
        let category = req.body.category;
        data = JSON.stringify(data);
        data = data.toString();

        dbCon.query("UPDATE contents SET title = ?, description = ?, data = ?, category = ?  WHERE title = ?", [title, description, data, category, title], (err, result) => {
            if (err) {
                req.flash("error", err.message);
                console.log(err);
            }
        });
    } else {
        res.redirect("/");
    }

});

module.exports = router;