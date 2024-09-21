
const redis = require('redis');
const client = require('../services/employeeService');

// client.set('testKey', 'testValue')
//   .then(() => {
//     return client.get('testKey');
// })
//   .then((value) => {
//     console.log('Value from Redis:', value); // Deve retornar 'testValue'
// })
//   .catch((err) => {
//     console.error('Redis error:', err);
// });


module.exports = {

    listOne: async (req, res) => {
        const { employeeId } = req.params;
        try {
          console.log('Fetching data for ID:', employeeId);
          const reply = await client.get(employeeId);
          console.log('Data fetched from Redis:', reply); // Dentro do GET
          if (reply) {
            res.status(200).send(JSON.parse(reply));
          } else {
            res.status(404).send('Item not found');
          }
        } catch (err) {
          res.status(500).send(err);
        }
    },

    register: async (req, res) => {
        const { id, data } = req.body;
        console.log('Data sent to Redis:', data); // Dentro do POST

        try {
          await client.set(id, JSON.stringify(data));
          res.status(201).send('Item created');
        } catch (err) {
          res.status(500).send(err);
        }
    },

    update: async (req, res) => {
        const { employeeId } = req.params;
        const { data } = req.body;
        try {
          await client.set(employeeId, JSON.stringify(data));
          res.status(200).send('Item updated');
        } catch (err) {
          res.status(500).send(err);
        }
    },

    delete: async (req, res) => {
        const { employeeId } = req.params;
        try {
          await client.del(employeeId);
          res.status(200).send('Item deleted');
        } catch (err) {
          res.status(500).send(err);
        }
    },

}


