//método up sempre é responsável pela criação da tabela
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table){
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();

        //criando FK
        table.foreign('ong_id').references('id').inTable('ongs');
    })  
};

//se der algum problema, o que eu devo fazer? este é o uso do método down
exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};


//para executar e criar a tabela -> npx knex migrate:latest
//npx knex migrate:make create_ongs
//npx knex migrate:rollback //desfazer ultima ação 
//mostra todas as migrates geradas -> npx knex migrate:status