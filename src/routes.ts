import express from 'express';
import knex from './database/connection';

//Permite que eu acople minhas rotas ao nosso arquivo principal
const routes = express.Router();

//Rota que recupera o usuário do nosso banco de dados, assíncrona
routes.get('/', async (request, response) => {

    //Selecionamos o com o knex e aguardamos os resultados
    const users = await knex('users').select('*');

    //Loopamos e criamos nossos objetos em JSON
    const serializedUsers = users.map(user => {
        return {
            nome: user.name,
        };
    });
    
    response.send(serializedUsers);
});

//Exportamos a rota para dentro do nosso server

export default routes;