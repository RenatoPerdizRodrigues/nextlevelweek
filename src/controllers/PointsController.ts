import knex from '../database/connection';
//Importamos as requests
import { Request, Response, json } from 'express';

class PointsController {

    //Index de pontos
    async index(request: Request, response: Response) {
        //Receberemos os query params
        const {city, uf, items} = request.query;

        //Convertemos a string para um array
        const parsedItems = String(items).split(',').map(item => Number(item.trim()));

        const points = await knex('points').
            join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id',parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        return response.json(points);
    }

    //Criação de pontos
    async create(request: Request, response: Response) {
    
        //Desconstruímos a request já em variáveis
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        /**
         * Criamos uma transação de nome trx
         * Se a primeira não rolar, a segunda não vai!
         */
        const trx = await knex.transaction();

        const point = {
            image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };
    
        /**Vamos criar um ponto de coleta que coleta N itens
         * Estamos omitindo o nome das variáveis para fazer a short syntax, nos retornará os IDs criados
         */
        const insertedIds = await trx('points').insert(point);
    
        //Variável do ID do point
        const point_id = insertedIds[0];
    
        /**Vamos loopar os itens a serem inseridos
         * para capturar seu ID e o ID do único ponto criado
         */
        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id: point_id,
            }
        })
        
        //Inserção do relacionamento
        await trx('point_items').insert(pointItems);

        //Commitamos para finalizar a transação e commitar os inserts
        await trx.commit();
    
        return response.json({ 
            id: point_id,
            point, });
    }

    //Show de pontos
    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if(!point){
            response.status(400).json({ message: 'Point not found.' });
        }

        //Fazemos um join para retornar os itens
        const items = await knex('items')
            .join('point_items', 'items.id', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.id','items.title');

        return response.json({ point, items });
    }

}

//Precisamos de um exportador default
export default PointsController;