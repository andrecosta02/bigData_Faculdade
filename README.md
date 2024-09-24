## Projeto Crud
Gerenciamento de Colaboradores

# Campos para adicionar
    matricula
    name
    email
    genero
    cpf
    psw
    admissao
    salario
    telefone
    cargo
    cep
    logradouro
    bairro
    cidade
    uf

        const registerValidation = [
            body('name')
                .notEmpty().withMessage('name cannot be empty')
                .isString().withMessage('name must be a string')
                .isLength({ min: 3, max: 60 }).withMessage('name must be between 3 and 60 characters'),

            body('data.last_name')
                .notEmpty().withMessage('last_name cannot be empty')
                .isString().withMessage('last_name must be a string')
                .isLength({ min: 3, max: 60 }).withMessage('last_name must be between 3 and 60 characters'),

            body('username')
                .notEmpty().withMessage('username cannot be empty')
                .isString().withMessage('username must be a string')
                .isLength({ min: 3, max: 60 }).withMessage('username must be between 3 and 60 characters'),
                
            body('email')
                .notEmpty().withMessage('email cannot be empty')
                .isString().withMessage('email must be a string')
                .isEmail().withMessage('email must be a valid email address')
                .isLength({ min: 3, max: 60 }).withMessage('email must be between 3 and 60 characters'),
                
            body('cpf')
                .notEmpty().withMessage('cpf cannot be empty')
                .isString().withMessage('cpf must be a string')
                .isLength({ min: 11, max: 11 }).withMessage('cpf must be 11 characters')
                .matches(/^\d+$/).withMessage('CPF must contain only numbers'),
                
            body('psw')
                .isString().withMessage('psw must be a string')
                .isLength({ min: 8 }).withMessage('psw must be at least 8 characters long')
                .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('psw must contain at least one special character'),

            body('gender')
                .notEmpty().withMessage('gender cannot be empty')
                .isString().withMessage('gender must be a string')
                .isIn(['M', 'F']).withMessage('Gender must be either M or F'),
                
            body('birth')
                .notEmpty().withMessage('birth cannot be empty')
                .isString().withMessage('birth must be a string')
                .matches(/^\d{8}$/).withMessage('birth must be in the format AAAAMMDD')
                .custom((value) => {
                    if (isAdult(value) < 18) {
                        throw new Error('User must be at least 18 years old');
                    }
                    return true;
                }),

            body('cep')
                .notEmpty().withMessage('cep cannot be empty')
                .isString().withMessage('cep must be a string')
                .isLength({ min: 8, max: 8 }).withMessage('CEP must be exactly 8 characters long')
                .matches(/^\d+$/).withMessage('CEP must contain only numbers'),

            body('city')
                .notEmpty().withMessage('City is required')
                .isLength({ min: 2, max: 100 }).withMessage('City must be between 2 and 100 characters long')
                .matches(/^[a-zA-Z\s]+$/).withMessage('City must contain only letters and spaces')
        ];

# DOCUMENTAÇÃO DO PROJETO #

## 1. Para criar o Projeto Node:

1.1.:
***
    npm ini -y 
***
1.2.:
***
    npm install express mysql dotenv cors body-parser showdown request @hapi/joi express-validator

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

## 2. (DDL) Criação do Banco de Dados MySQL: ###

    create database dbClient
***
    use dbClient
***
    create table client (
        client_id int primary key auto_increment,
        name varchar(60),
        email varchar(60),
        address varchar(60),
        cpf varchar(11),
        creation_date date
    )
***
    INSERT INTO client (NAME, email, address, cpf, creation_date) 
    VALUES ("Seu nome", "seuemail@email.com", "seu Endereço", "Seu CPF", "Data de Criação do CLiente")



## 3. Arquitetura de pastas do Projeto: ##
```
   api
    │   node_modules                    `Pasta onde ficam os arquivos de instalação do Node`
    │
    │   src─│                           `Pasta onde ficam os arquivos da API`
    │       │   db.js                   `Arquivo que cria a comunicação do Node com o MySQL`
    │       │   routes.js   	        `Criar as rotas da API`
    │       │   server.js               `Monda a inicialização do Server da API Rest`
    │       │   
    │       ├───controllers             `Pasta para os Controllers da API`
    │       │       carroController.js  `Como próprio nome já diz, ele faz o controle dos parâmetros das requisições`
    │       │
    │       └───services                `Pasta para fazer as Querys no Banco de Dados`
    │               carroService.js     `Monta a Query devida de acordo com o método Rest`
    │
    │   package-lock.json               `Arquivo de configuração do Node`
    │   package.json                    `Arquivo onde ficam os nomes e versões das dependências do projeto`
    │   read.me                         `Arquivo atual`
    │   variable.env                    `Arquivo que guarda as variáveis ocultas que serão utilizadas no projeto`
```




## 4. Rotas REST ##
### Inserir a rota logo após http://localhost:8080/
```
    get:        /client/list
    get one:    /client/list/:idClient
    get filter  /client/filter
    post:       /client/register
    put:        /client/update:idClient
    delete:     /client/delete:idClient
```