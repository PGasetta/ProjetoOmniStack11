const crypto = require('crypto'); //método node - utilizar string aleatória

const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        //com paginação - se não existir vai retornar a pagina 1
        const { page = 1 } = request.query;
        const ong_id = request.headers.authorization;

        const [count] = await connection('incidents')
        .count();
        
        const ongs = await connection('incidents')
        .join('ongs', 'ongs.id','=','incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['incidents.*','ongs.name','ongs.email','ongs.whatsapp','ongs.city', 'ongs.uf']);
        
        response.header('X-Total-Count', count['count(*)']);
        return response.json(ongs);
    },
    //para retorna somente depois de realizar o insert, adicionar o async
    async create(request, response){
        //const data = request.body;
        //console.log(data);

        const { title, description, value} = request.body; //desta forma o retorno é armazenado em variáveis
        const ong_id = request.headers.authorization;

        //await determina que só deve continuar depois que o método terminar,no caso o insert
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })
        
        //retornar o id pois a ongs precisa saber o id
        return response.json({ id });
    },
    async delete(request, response){
        const { id } = request.params; //desta forma o retorno é armazenado em variáveis
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents').where('id',id).select('ong_id').first();

        if(incident.ong_id != ong_id){
            return response.status(401).json({ error: 'Operation not permitted'});
        }

        await connection('incidents').where('id',id).delete();

        return response.status(204).send(); //retornar resposta sem conteudo -> 204
    }
};