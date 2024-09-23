## Projeto Crud
Gerenciamento de Colaboradores



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