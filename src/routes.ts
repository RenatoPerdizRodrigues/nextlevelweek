import express from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const pointsController = new PointsController();
const itemsController = new ItemsController();

//Permite que eu acople minhas rotas ao nosso arquivo principal
const routes = express.Router();

//Rota que retorna todos os usuários
routes.get('/items', itemsController.index);

//Rota de criação de ponto de colega
routes.get('/points', pointsController.index);
routes.post('/points', pointsController.create);
routes.get('/points/:id', pointsController.show);

//Exportamos a rota para dentro do nosso server
export default routes;