import knex from 'knex';

export async function seed(knex: knex){
    await knex('items').insert([
        {title: 'Lâmpada', image: 'lampadas.svg'},
        {title: 'Pilhas e Baterias', image: 'pilhas.svg'},
        {title: 'Papéis e Papelão', image: 'papeis-papelao.svg'},
        {title: 'Resíduos Eletrônicos', image: 'eletronicos.svg'},
        {title: 'Resíduos Orgânicos', image: 'organicos.svg'},
        {title: 'Óleo de Cozinha', image: 'oleo.svg'}
    ]);
}