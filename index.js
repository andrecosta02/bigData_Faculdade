const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');

const app = express();
const port = 3001;

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

app.use(bodyParser.json());

// Rota para criar um novo item
app.post('/item', async (req, res) => {
  const { id, data } = req.body;
  try {
    await client.set(id, JSON.stringify(data));
    res.status(201).send('Item created');
  } catch (err) {
    res.status(500).send(err);
  }
});

// Rota para ler um item
app.get('/item/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const reply = await client.get(id);
    if (reply) {
      res.status(200).send(JSON.parse(reply));
    } else {
      res.status(404).send('Item not found');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Rota para atualizar um item
app.put('/item/:id', async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  try {
    await client.set(id, JSON.stringify(data));
    res.status(200).send('Item updated');
  } catch (err) {
    res.status(500).send(err);
  }
});

// Rota para deletar um item
app.delete('/item/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await client.del(id);
    res.status(200).send('Item deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
