import express from 'express';
import knex from './database/connection';

//Permite que eu acople minhas rotas ao nosso arquivo principal
const routes = express.Router();

//Rota que retorna todos os usuários
routes.get('/items', async (request, response) => {
    //Selecionamos todos os itens
    const items = await knex('items').select('*');

    //Serializamos os dados do banco para deixá-los mastigados
    const serializedItems = items.map(item => {
        return{
            name: item.name,
            //Temos que usar JAPANESE ASPAS por algum motivo
            image_url: `http://localhost:3333/uploads/${item.image}`,
        }
    });

    response.send(serializedItems);
});

//Exportamos a rota para dentro do nosso server
export default routes;