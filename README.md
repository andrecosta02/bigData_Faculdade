## Projeto Crud
Gerenciamento de Colaboradores

### Topicos da Apresentação
- Redis
- Node.JS / CRUD
- Gerenciamento de Colaboradores
- Postman / Validação
- 

# DOCUMENTAÇÃO DO PROJETO #

## 1. Para criar o Projeto Node:

1.1.:
***
    npm ini -y 
***
1.2.:
***
    npm install express dotenv cors body-parser request express-validator

1.3.:
***
    npm install nodemon --save--dev


1.4. Adicionar no script do package.json o start abaixo para o Nodemon funcionar apenas com ***"npm start"***:

    "scripts": {
        "start": "nodemon ./src/server.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },

1.5. Para iniciar o Projeto:

    npm start


## 2. Arquitetura de pastas do Projeto: ##
```
   api
    │   node_modules
    │
    │   src─│
    │       │   routes.js   	            `Cria as rotas da API`
    │       │   server.js                   `Monda a inicialização do Server da API Rest`
    │       │   validations.js              `Validações usadas nas Requisições`
    │       │   
    │       ├───controllers
    │       │       employeeController.js  `Arquivo que são encontrados os metodos do Projeto`
    │       │
    │       └───services
    │               redisService.js         `Cria a conexão com o Servidor do Redis`
    │
    │   package-lock.json               `Arquivo de configuração do Node`
    │   package.json                    `Arquivo onde ficam os nomes e versões das dependências do projeto`
    │   read.me                         `Arquivo atual`
    │   .env                            `Arquivo que guarda as variáveis ocultas que serão utilizadas no projeto`
    │   .env.example                    `.env de exemplo`
    │   .gitignore                      `Arquivos ignorados pelo Git`
```




## 4. Rotas REST ##
### Inserir a rota logo após http://localhost:8080/
```
    get:        /employee/listAll
    get:        /employee//list/:employeeId
    post:       /employee/register
    put:        /employee/update:employeeId
    delete:     /employee/delete:employeeId
```