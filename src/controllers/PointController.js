
const redis = require('redis');
const client = require('../services/redisService');
const { validationResult } = require('express-validator');
const { body, param } = require('express-validator');
const { employeeValidations } = require('../validations')
const https = require('https');



module.exports = {

  listAll: async (req, res) => {
    try {
      // console.log('Fetching all data from Redis');

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

  register: async (req, res) => {
    const { data } = req.body;

    // await Promise.all(registerValidation.map(validation => validation.run(req)))
    await Promise.all(employeeValidations.map(validation => validation.run(req)))

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ statusCode: 400, message: 'Erro de validação', errors: errors.array() })
    }

    try {
      // Gera a matrícula automaticamente com auto-incremento
      const matricula = await client.incr('employee_id'); // 'employee_id' é a chave usada para auto-incremento
      // console.log('Matrícula gerada:', matricula);

      // Chama a função de obtenção do endereço e espera sua resolução
      const address = await getAddressByCep(data.cep);
      // console.log('Endereço obtido:', address);

      data.logradouro = address.logradouro;
      data.bairro = address.bairro;
      data.cidade = address.localidade;
      data.uf = address.uf;

      // Adiciona a matrícula gerada ao objeto 'data'
      data.matricula = matricula.toString().padStart(6, '0'); // Garantindo que a matrícula tenha 6 dígitos

      // console.log('Dados finais:', data);

      // Salva no Redis
      await client.set(matricula.toString(), JSON.stringify(data)); // Matrícula convertida para string
      res.status(201).send('Item created');
    } catch (err) {
      console.error('Erro:', err.message);
      res.status(500).send(err);
    }
  },

}
