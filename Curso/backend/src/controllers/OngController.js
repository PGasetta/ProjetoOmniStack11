const crypto = require('crypto'); //método node - utilizar string aleatória

const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    //para retorna somente depois de realizar o insert, adicionar o async
    async create(request, response){
        //const data = request.body;
        //console.log(data);
        const { name, email, whatsapp, city, uf} = request.body; //desta forma o retorno é armazenado em variáveis
        //criar id automáticamente
        const id = crypto.randomBytes(4).toString('HEX'); //gerar 4 bits de caracteres aleatórios e convertendo em uma string HEXADECIMAL
        //await determina que só deve continuar depois que o método terminar,no caso o insert
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
        
        //retornar o id pois a ongs precisa saber o id
        return response.json({ id });
    }
};