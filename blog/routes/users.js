var express = require('express');
var router = express.Router();
let dbCon = require("../lib/db");

/* GET users listing. */
router.get('/login', function(req, res, next) {
    if (req.session.user_login) {
        res.redirect("/");
    } else {
        res.render('login', { title: 'Login', user_login: req.session.user_login });
    }
});

router.post('/login', function(req, res, next) {
    if (!req.session.user_login) {
        let email = req.body.email;
        let password = req.body.password;

        dbCon.query(
            "SELECT * FROM users WHERE email = ?", [email],
            (err, rows) => {
                if (rows.length > 0) {
                    if (err) {
                        req.flash("error", err);
                    } else {
                        if (rows[0].password == password) {
                            req.session.user_login = rows[0];
                            res.redirect("/");
                        } else {
                            req.flash("error", "email หรือ password ไม่ถูกต้อง");
                            res.redirect("/login");
                        }
                    }
                } else {
                    req.flash("error", "email หรือ password ไม่ถูกต้อง");
                    res.redirect("/login");
                }
            }
        );
    } else {
        res.redirect("/");
    }

});


router.get("/logout", function(req, res, next) {
    req.session.destroy();
    res.redirect("/");
});

router.get("/admin", function(req, res, next) {
    if (req.session.user_login) {
        res.render("admin/admin", { title: 'Menu', user_login: req.session.user_login })
    } else {
        res.redirect("/");
    }

});


module.exports = router;