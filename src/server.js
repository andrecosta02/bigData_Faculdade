require("dotenv-safe").config();
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const redis = require('redis');

const routes = require("./routes")
const server = express()

server.use(bodyParser.json())
server.use(cors())

server.use("/employee", routes)

server.listen(process.env.PORT_API, () => {
    console.log(`Server running on port ${process.env.PORT_API}`);
});