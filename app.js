const express = require("express");
const mongoose = require('mongoose');
const loginRoutes = require("./routes/login")
const userRoutes = require("./routes/user")
const connect = require("./connection/connect")

//CRUD -- CREATE -- READ -- UPDATE -- DELETE
const app = express();

app.use("/api/v1", loginRoutes);
app.use("/api/v1", userRoutes);

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.listen(3000, () => console.log("Server is up at 3000 port"))