var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
let dbCon = require("../lib/db");
const fs = require("fs");

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
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            // upload only png and jpg format
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})


const videoStorage = multer.diskStorage({
    destination: 'public/videos', // Destination to store video 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() +
            path.extname(file.originalname))
    }
});


const videoUpload = multer({
    storage: videoStorage,
    limits: {
        fileSize: 5000000000 // 500000000 Bytes = 500 MB
    },
    fileFilter(req, file, cb) {
        // upload only mp4 and mkv format
        if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
            return cb(new Error('Please upload a video'))
        }
        cb(undefined, true)
    }
})


router.post('/uploadVideo', videoUpload.single('video'), (req, res) => {
    if (req.session.user_login) {
        let file = req.file;
        let title = req.body.title;
        let url = "videos/" + file.filename;
        var sql = "INSERT INTO videos (title, url) VALUES ('" + title + "', '" + url + "')";
        dbCon.query(sql, function(err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
        req.flash("success", "uploaded");
        res.redirect('/videos/1');
    } else {
        res.redirect("/");
    }

}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// For multiple image upload

router.post('/uploadBulkImage', imageUpload.array('image', 4), (req, res) => {
    if (req.session.user_login) {
        let files = req.files;
        let title = req.body.title;
        files.forEach(element => {
            let url = "images/" + element.filename;
            var sql = "INSERT INTO images (title, url) VALUES ('" + title + "', '" + url + "')";
            dbCon.query(sql, function(err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        });
        req.flash("success", "uploaded");
        res.redirect('/images/1');
    } else {
        res.redirect("/");
    }

}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.post('/uploadBulkImage_header', imageUpload.array('image', 4), (req, res) => {
    if (req.session.user_login) {
        let files = req.files;
        let title = req.body.title;
        files.forEach(element => {
            let url = "images/" + element.filename;
            var sql = "INSERT INTO images_header (title, url) VALUES ('" + title + "', '" + url + "')";
            dbCon.query(sql, function(err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        });
        req.flash("success", "uploaded");
        res.redirect('/images_header/1');
    } else {
        res.redirect("/");
    }

}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

/* GET users listing. */
router.get('/images_header/:page', function(req, res, next) {
    if (req.session.user_login) {
        var resultPerPage = 5
        var page = req.params.page || 1
        dbCon.query("SELECT * FROM images_header", function(err, rows) {
            if (err) throw err;
            if (rows) {
                const numOfResults = rows.length;
                const numberOfPages = Math.ceil(numOfResults / resultPerPage);

                const startingLimit = (page - 1) * resultPerPage;
                if (rows.length > 0) {

                    dbCon.query(`SELECT * FROM images_header ORDER BY id DESC  LIMIT ${startingLimit}, ${resultPerPage}`, (err, result1) => {
                        if (err) throw err;
                        let iterator = (page - 5) < 1 ? 1 : page - 5;
                        let endingLink = (iterator + 5) <= numberOfPages ? (iterator + 5) : page + (numberOfPages + page);
                        res.render("media/imgaeHeader", {
                            images: result1,
                            page: page,
                            iterator: iterator,
                            endingLink: endingLink,
                            numberOfPages: numberOfPages,
                            title: "Images",
                            user_login: req.session.user_login
                        });
                    })
                } else {
                    if (err) throw err;
                    let iterator = (page - 5) < 1 ? 1 : page - 5;
                    let endingLink = (iterator + 5) <= numberOfPages ? (iterator + 5) : page + (numberOfPages + page);
                    res.render("media/imgaeHeader", {
                        images: "",
                        page: page,
                        iterator: iterator,
                        endingLink: endingLink,
                        numberOfPages: numberOfPages,
                        title: "Images",
                        user_login: req.session.user_login
                    });
                }

            }
        });
    } else {
        res.redirect("/");
    }


});



router.get('/images/:page', function(req, res, next) {
    if (req.session.user_login) {
        var resultPerPage = 5
        var page = req.params.page || 1
        dbCon.query("SELECT * FROM images", function(err, rows) {
            if (err) throw err;
            if (rows) {
                const numOfResults = rows.length;
                const numberOfPages = Math.ceil(numOfResults / resultPerPage);

                const startingLimit = (page - 1) * resultPerPage;
                if (rows.length > 0) {

                    dbCon.query(`SELECT * FROM images ORDER BY id DESC  LIMIT ${startingLimit}, ${resultPerPage}`, (err, result1) => {
                        if (err) throw err;
                        let iterator = (page - 5) < 1 ? 1 : page - 5;
                        let endingLink = (iterator + 5) <= numberOfPages ? (iterator + 5) : page + (numberOfPages + page);
                        res.render("media/imagePage", {
                            images: result1,
                            page: page,
                            iterator: iterator,
                            endingLink: endingLink,
                            numberOfPages: numberOfPages,
                            title: "Images",
                            user_login: req.session.user_login
                        });
                    })
                } else {
                    if (err) throw err;
                    let iterator = (page - 5) < 1 ? 1 : page - 5;
                    let endingLink = (iterator + 5) <= numberOfPages ? (iterator + 5) : page + (numberOfPages + page);
                    res.render("media/imagePage", {
                        images: "",
                        page: page,
                        iterator: iterator,
                        endingLink: endingLink,
                        numberOfPages: numberOfPages,
                        title: "Images",
                        user_login: req.session.user_login
                    });
                }

            }
        });
    } else {
        res.redirect("/");
    }


});


router.get('/videos/:page', function(req, res, next) {
    if (req.session.user_login) {
        var resultPerPage = 5
        var page = req.params.page || 1
        dbCon.query("SELECT * FROM videos", function(err, rows) {
            if (err) throw err;
            if (rows) {
                const numOfResults = rows.length;
                const numberOfPages = Math.ceil(numOfResults / resultPerPage);

                const startingLimit = (page - 1) * resultPerPage;
                if (rows.length > 0) {
                    dbCon.query(`SELECT * FROM videos ORDER BY id DESC  LIMIT ${startingLimit}, ${resultPerPage}`, (err, result1) => {
                        if (err) throw err;
                        let iterator = (page - 5) < 1 ? 1 : page - 5;
                        let endingLink = (iterator + 5) <= numberOfPages ? (iterator + 5) : page + (numberOfPages + page);
                        res.render("media/videoPage", {
                            videos: result1,
                            page: page,
                            iterator: iterator,
                            endingLink: endingLink,
                            numberOfPages: numberOfPages,
                            title: "Videos",
                            user_login: req.session.user_login
                        });
                    })
                } else {
                    if (err) throw err;
                    let iterator = (page - 5) < 1 ? 1 : page - 5;
                    let endingLink = (iterator + 5) <= numberOfPages ? (iterator + 5) : page + (numberOfPages + page);
                    res.render("media/videoPage", {
                        videos: "",
                        page: page,
                        iterator: iterator,
                        endingLink: endingLink,
                        numberOfPages: numberOfPages,
                        title: "Videos",
                        user_login: req.session.user_login
                    });
                }
            }
        });
    } else {
        res.redirect("/");
    }

});

router.get('/delete/video/:id', function(req, res, next) {
    if (req.session.user_login) {
        let id = req.params.id;
        dbCon.query("SELECT * FROM videos WHERE id = ?", id, (err, result) => {
            if (err) throw err;
            try {
                fs.unlinkSync(__dirname + "/../public/" + result[0].url);

                console.log("File is deleted.");
            } catch (error) {
                console.log(error);
            }
        });

        dbCon.query("DELETE FROM videos WHERE id = ?", id, (err, result) => {
            if (err) throw err;
        });
        req.flash("success", "delete!!");
        res.redirect("/videos/1");
    } else {
        res.redirect("/");
    }


});


router.get('/delete/image_gallery/:id', function(req, res, next) {
    if (req.session.user_login) {
        let id = req.params.id;
        dbCon.query("SELECT * FROM images WHERE id = ?", id, (err, result) => {
            if (err) throw err;
            try {
                fs.unlinkSync(__dirname + "/../public/" + result[0].url);

                console.log("File is deleted.");
            } catch (error) {
                console.log(error);
            }
        });

        dbCon.query("DELETE FROM images WHERE id = ?", id, (err, result) => {
            if (err) throw err;
        });
        req.flash("success", "delete!!");
        res.redirect("/images/1");
    } else {
        res.redirect("/");
    }

});


router.get('/delete/image_header/:id', function(req, res, next) {
    if (req.session.user_login) {
        let id = req.params.id;
        dbCon.query("SELECT * FROM images_header WHERE id = ?", id, (err, result) => {
            if (err) throw err;
            try {
                fs.unlinkSync(__dirname + "/../public/" + result[0].url);

                console.log("File is deleted.");
            } catch (error) {
                console.log(error);
            }
        });

        dbCon.query("DELETE FROM images_header WHERE id = ?", id, (err, result) => {
            if (err) throw err;
        });
        req.flash("success", "delete!!");
        res.redirect("/images_header/1");
    } else {
        res.redirect("/");
    }

});

router.get('/get-img-header', function(req, res, next) {
    dbCon.query("SELECT * FROM images_header", (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = router;