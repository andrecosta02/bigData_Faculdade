const redis = require('redis');

// Configuração do Redis
const client = redis.createClient({
    url: 'redis://127.0.0.1:6379'
});

client.connect().catch(console.error);

client.on('error', (err) => {
    console.error('Redis client not connected to the server:', err);
});

client.on('ready', () => {
    console.log('Redis client connected to the server');
});

module.exports = client;
