require("dotenv").config({path:"./variable.env"})
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
// const request = require("request")
const redis = require('redis');

const routes = require("./routes")
const server = express()
const port = 3000;

server.use(bodyParser.json())
server.use(cors())

server.use("/employee", routes)

// const client = redis.createClient({
//     url: 'redis://127.0.0.1:6379'
// });

// client.connect().catch(console.error);
  
// client.on('error', (err) => {
//     console.error('Redis client not connected to the server:', err);
// });
  
// client.on('ready', () => {
//     console.log('Redis client connected to the server');
// });

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

