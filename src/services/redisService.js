const redis = require('redis');
require("dotenv-safe").config();

const client = redis.createClient({
    url: process.env.URL_REDIS
});

client.connect().catch(console.error);

client.on('error', (err) => {
    console.error('Redis client not connected to the server:', err);
});

client.on('ready', () => {
    console.log('Redis client connected to the server');
});

module.exports = client;
