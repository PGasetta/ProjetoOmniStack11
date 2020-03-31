const express = require('express');
const crypto = require('crypto'); //método node - utilizar string aleatória
const connection = require('./database/connection');
const { celebrate , Segments, Joi } = require('celebrate');

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

routes.post('/ongs',celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().min(3),
        email:Joi.string().required().email(),
        whatsapp: Joi.number().required().min(11),
        city: Joi.string().required(),
        uf:Joi.string().required().length(2),
    })
}) ,OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]:Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]:Joi.object().keys({
        paeg: Joi.number(),
    })
}), IncidentController.index);
routes.post('/incidents', celebrate({
    [Segments.HEADERS]:Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().min(3),
        email:Joi.string().required().email(),
        whatsapp: Joi.number().required().min(11),
        city: Joi.string().required(),
        uf:Joi.string().required().length(2),
    }),
}),IncidentController.create);


routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]:Joi.object().keys({
        id:Joi.number().required(),
    })
}), IncidentController.delete);


module.exports = routes; //desta forma que faz no node para exportar uma variavel de dentro de um arquivo