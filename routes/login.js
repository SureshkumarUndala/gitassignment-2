const express = require("express");
const bodyParser = require('body-parser')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/users")
const bcrypt = require('bcrypt');

router.use(bodyParser.json());

router.post("/register", body('email').isEmail(),
    body('name').isAlpha(),
    body('password').isLength({ min: 5, max: 16 }), async (req, res) => {

        try {
            // Finds the validation errors in this request and wraps them in an object with handy functions
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { name, email, password } = req.body;

            let user = await User.findOne({ email });

            if (user) {
                return res.status(401).json({
                    status: "Failed",
                    message: "Email already exists"
                });
            }

            bcrypt.hash(password, 10, async function(err, hash) {
                if (err) {
                    return res.status(404).json({
                        status: "Failed",
                        message: err.message
                    });
                }
                const user = await User.create({
                    name,
                    email,
                    password: hash
                })
                return res.json({
                    status: "Success",
                    message: "Registration Successful",
                    user
                })
            });
        } catch (e) {
            res.status(500).json({
                status: "failed",
                message: e.message
            })
        }
    })

router.post("/login", body('email').isEmail(), async (req, res) => {

    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "User doesnt exists"
            });
        }

        bcrypt.compare(password, user.password, function (err, result) {
            // result == true
            if (err) {
                return res.status(500).json({
                    status: "Failed",
                    message: err.message
                });
            }
            if (result) {
                return res.status(200).json({
                    status: "Success",
                    message: "Login Successful"
                });
            } else {
                return res.status(404).json({
                    status: "Failed",
                    message: "Invalid Please provide correct email/password"
                });

            }
        });

    } catch (e) {
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
})

module.exports = router;