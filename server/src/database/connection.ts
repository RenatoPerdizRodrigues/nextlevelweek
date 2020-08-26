import knex from 'knex';

//Caso fôsesmos usar SQLite, path nos permitiria usar o path
//import path from 'path';

//Para instanciar nossa conexão, precisamos ter instalado o mysql no NPM
const connection = knex({
    client:'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'db_nlw'
    }
});

//Exportamos a conexão
export default connection;