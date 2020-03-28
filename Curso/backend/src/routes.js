const express = require('express');
const crypto = require('crypto'); //método node - utilizar string aleatória
const connection = require('./database/connection');

const OngController  = require('./controllers/OngController');
const IncidentController  = require('./controllers/IncidentController');
const ProfileController  = require('./controllers/ProfileController');

const SessionController  = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/users/:id', (request, response) => {
    const params = request.params;

    console.log(params);

    return response.json({
        evento: 'Semana OmniStack 11.0',
        aluno: 'Paulo Gasetta'
    })
});

routes.post('/usersbody', (request, response) => {
    const body = request.body;

    console.log(body);

    return response.json({
        evento: 'Semana OmniStack 11.0',
        aluno: 'Paulo Gasetta'
    })
});

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);


module.exports = routes; //desta forma que faz no node para exportar uma variavel de dentro de um arquivo