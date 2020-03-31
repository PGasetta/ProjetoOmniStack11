const express = require('express');
const routes = require('./routes'); //  o ./ é para referenciar a mesma pasta do arquivo index e diz que é para utilizar um arquivo e não um pacote
const cors = require('cors'); //determina quem vai poder acessar a aplicação
const { errors } = require('celebrate');
const app = express();
//em desenv
app.use(cors()); //qualquer aplicação pode usar a API
/*
//em produção
app.use(cors({
  origin: 'http://pgztec.com.br'
}));//somente aplicações deste endereço podem usar a API (qual endereço poderá acessar a aplicação)
*/

//celebrete - para validação de javascript => npm install celebrate

app.use(express.json()); //FALANDO PARA EXPRESS QUE PARA O CORPO DAS REQUISIÇÕES SERÁ USADO JSON
app.use(routes);
app.use(errors());
/**
 * Métodos GET
 * 
 * GET: Buscar/Listar uma informção do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end 
 * DELETE: Deletar uma informação no back-end
 */


 /**
  * Tipos de Parâmetros:
  * 
  * Query Params: Parâmetros nomeados enviados  na rota após "?" (filtros, paginação)
  * Route Params: Parâmetros utilizados par aidentificar recursos
  *     Exemplo: app.get('/users/:id', (request, response) => {
  *         quando coloca o :id, quer dizer que tudo o que é colocado depois do users/ é nomeado como id
  *         URL: http://localhost:3333/users/1  <- usuário por exemplo com id = 1
  * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
  * 
  */

/**
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, MS SQL Server
 * NoSQL: MomgoDB, CouchDB, etc....
 */
/**
 * Driver: SELECT * FROM users....
 * Query Builder: table('users').select('*').where()....
 *  http://knexjs.org/ -> Installation
 */


app.listen(3333);

// para rodar a aplicação por causa do nodemon tem que usar o comando npm start e não mais o node index.js