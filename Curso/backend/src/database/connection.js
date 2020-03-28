const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development); //criando e passando a conexão de desenvolvimento

module.exports = connection; //exportando a conexão