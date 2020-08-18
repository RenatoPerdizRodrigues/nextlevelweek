import knex from '../database/connection';
import { Request, Response } from 'express';

class ItemsController{

    //Listagem de itens
    async index(request: Request, response: Response) {
        //Selecionamos todos os itens
        const items = await knex('items').select('*');
    
        //Serializamos os dados do banco para deixá-los mastigados
        const serializedItems = items.map(item => {
            return{
                id: item.id,
                title: item.title,
                //Temos que usar JAPANESE ASPAS por algum motivo
                image_url: `http://localhost:3333/uploads/${item.image}`,
            }
        });
    
        response.send(serializedItems);
    }
}

export default ItemsController;