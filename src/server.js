require("dotenv").config({path:"./variable.env"})
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const redis = require('redis');

const routes = require("./routes")
const server = express()
const port = 8080;

server.use(bodyParser.json())
server.use(cors())

server.use("/employee", routes)

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});