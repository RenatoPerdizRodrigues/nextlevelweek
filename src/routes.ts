import express from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

import { celebrate, Joi } from 'celebrate';

const pointsController = new PointsController();
const itemsController = new ItemsController();

//Permite que eu acople minhas rotas ao nosso arquivo principal
const routes = express.Router();
const upload = multer(multerConfig);

//Rota que retorna todos os usuários
routes.get('/items', itemsController.index);

//Rota de criação de ponto de colega
routes.get('/points', pointsController.index);
routes.post(
    '/points', 
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
    }, {
        abortEarly: false
    }),
    pointsController.create);
routes.get('/points/:id', pointsController.show);

//Exportamos a rota para dentro do nosso server
export default routes;