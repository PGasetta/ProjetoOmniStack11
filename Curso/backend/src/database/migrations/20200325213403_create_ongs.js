//método up sempre é responsável pela criação da tabela
exports.up = function(knex) {
    return knex.schema.createTable('ongs', function (table){
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    })  
};

//se der algum problema, o que eu devo fazer? este é o uso do método down
exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};


//para executar e criar a tabela -> npx knex migrate:latest
//npx knex migrate:make create_ongs
//npx knex migrate:rollback //desfazer ultima ação 
//mostra todas as migrates geradas -> npx knex migrate:status