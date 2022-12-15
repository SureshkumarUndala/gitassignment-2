const express  = require("express");
const router = express.Router();
const User = require("../models/users")
const bodyParser = require('body-parser')


router.use(bodyParser.json());

//READ ALL THE DATA
router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: "Success",
            data: users
        })
    } catch (e) {
        res.status(404).json({
            status: "failed",
            message: e.message
        })
    }
})

// READ THE SINGLE DATA 
router.get("/users/:id", async (req, res) => {
    try {
        // console.log(req.params.id)
        const users = await User.find({_id: req.params.id});
        res.status(200).json({
            status: "Success",
            data: users
        })
    } catch (e) {
        res.status(404).json({
            status: "failed",
            message: e.message
        })
    }
})

//CREATE THE DATA 
router.post("/users", async (req, res) => {
    try {
        const users = await User.create(req.body);
        res.status(200).json({
            status: "Success",
            data: users
        })
    } catch (e) {
        res.status(404).json({
            status: "failed",
            message: e.message
        })
    }
})

//UPDATE THE DATA 
router.put("/users/:id", async (req, res) => {
    try {
       //findOneAndUpdate
       //findByIdAndUpdate
        const users = await User.updateOne({_id:req.params.id},req.body);
        res.status(200).json({
            status: "Success",
            data: users
        })
    } catch (e) {
        res.status(404).json({
            status: "failed",
            message: e.message
        })
    }
})

//DELETE ALL THE DATA 
router.delete("/users/:id", async (req, res) => {
    try {
       //findOneAndUpdate
        const users = await User.deleteOne({_id:req.params.id});
        res.status(200).json({
            status: "Success",
            data: users
        })
    } catch (e) {
        res.status(404).json({
            status: "failed",
            message: e.message
        })
    }
})

router.get("*", (req, res) => {
    res.status(404).json({
        status: "Failed",
        message: "Invalied request"
    })
})

module.exports= router;