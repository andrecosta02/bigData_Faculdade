
const redis = require('redis');
const client = require('../services/employeeService');
const { validationResult } = require('express-validator');
const { body, param } = require('express-validator');
const https = require('https');

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

    listAll: async (req, res) => {
      try {
          console.log('Fetching all data from Redis');

          // Obtém todas as chaves armazenadas no Redis
          const keys = await client.keys('*');

          if (keys.length === 0) {
              return res.status(404).send('No records found');
          }

          // console.log(keys);

          // Utiliza `mGet` para obter os valores de todas as chaves
          const records = await client.mGet(keys);

          // Combina as chaves e os valores em um array de objetos com { id, value }
          let parsedRecords = keys.map((key, index) => ({
              id: key,
              value: JSON.parse(records[index]) // Converte cada valor de string para JSON
          }));

          // Ordena os registros com base no 'id' (convertido para número, se aplicável)
          parsedRecords.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

          // console.log('Data fetched from Redis:', parsedRecords);

          // Retorna os dados no formato de lista de { id, value }
          res.status(200).json(parsedRecords);
      } catch (err) {
          res.status(500).send(err);
      }
    },

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

        const name = data?.name;
        const cep = data?.cep;

        let logradouro = "";
        let bairro = "";
        let localidade = "";
        let uf = "";

        // getAddressByCep(cep)
        // .then((address) => {
        //   // console.log(address);
        //   logradouro = address.logradouro
        //   bairro = address.bairro
        //   localidade = address.localidade
        //   uf = address.uf

        // })
        // .catch((error) => {
        //   console.error('Erro:', error.message);
        // });

        const registerValidation = [
          body('id')
            .notEmpty()
              .withMessage('id cannot be empty')
            .isString()
              .withMessage('id must be a string')
            .isLength({ min: 1, max: 6 })
              .withMessage('id must be between 3 and 60 characters'),

          body('data.name')
            .notEmpty()
              .withMessage('name cannot be empty')
            .isString()
              .withMessage('name must be a string')
            .isLength({ min: 3, max: 60 })
              .withMessage('name must be between 3 and 60 characters'),

          body('data.cep')
            .notEmpty()
              .withMessage('cep cannot be empty')
            .isString()
              .withMessage('cep must be a string')
            .isLength({ min: 8, max: 8 })
              .withMessage('CEP must be exactly 8 characters long')
            .matches(/^\d+$/)
              .withMessage('CEP must contain only numbers'),


          body('data.description')
            .notEmpty()
              .withMessage('description cannot be empty')
            .isString()
              .withMessage('description must be a string')
            .isLength({ min: 10, max: 60 })
              .withMessage('description must be between 10 and 60 characters')
        ];

        await Promise.all(registerValidation.map(validation => validation.run(req)))
    
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
          return res.status(422).json({ statusCode: 400, message: 'Erro de validação', errors: errors.array() })
        }
      
        try {
          // Chama a função de obtenção do endereço e espera sua resolução
          const address = await getAddressByCep(cep);
  
          logradouro = address.logradouro;
          bairro = address.bairro;
          localidade = address.localidade;
          uf = address.uf;
  
          // Como `data` é um objeto, adiciona as novas propriedades ao objeto
          data.logradouro = logradouro;
          data.bairro = bairro;
          data.localidade = localidade;
          data.uf = uf;
  
          // Salva no Redis
          await client.set(id, JSON.stringify(data));
          res.status(201).send('Item created');
        } catch (err) {
            console.error('Erro:', err.message);
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





function getAddressByCep(cep) {
  return new Promise((resolve, reject) => {
    // Formata o CEP removendo qualquer caractere que não seja número
    const formattedCep = cep.replace(/\D/g, '');
    
    // Faz a requisição à API ViaCEP
    const url = `https://viacep.com.br/ws/${formattedCep}/json/`;

    https.get(url, (resp) => {
      let data = '';

      // Coletando dados em blocos
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // Quando a resposta estiver completa
      resp.on('end', () => {
        const addressData = JSON.parse(data);

        // Verifica se houve erro (por exemplo, se o CEP não foi encontrado)
        if (addressData.erro) {
          reject(new Error('CEP não encontrado.'));
        } else {
          // Retorna apenas as informações solicitadas
          const { logradouro, bairro, localidade, uf } = addressData;
          resolve({ logradouro, bairro, localidade, uf });
        }
      });

    }).on('error', (err) => {
      reject(err);
    });
  });
}