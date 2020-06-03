//Importando o express
import express, { response } from 'express';

//Definindo o express e configurando que recebe em JSON
const app = express();
app.use(express.json());

//Fazemos um array para utilizarmos nas funções abaixo
const users =["Renato","Lorran","Erick"];

//Rota get que listará todos os usuários, com uma query opcional de filtro
app.get('/users', (request, response) => {

    const search = String(request.query.search);
    const filteredUsers = search != 'undefined' ? users.filter(user => user.includes(search)) : users;
    response.send(filteredUsers);
});

//Rota get que lista o usuário específico de acordo com seu ID
app.get('/users/:id', (request, response) => {

    const id = Number(request.params.id);
    const user = users[id];
    response.json(user);
});

//Rota de yeehaw
app.get('/', (request, response) => {
    response.json({"yee":"haw"});
});

//Rota POST que recebe um nome e e-mail
app.post('/users', (request,response) => {
    const user = {
        name: request.body.name,
        email: request.body.email,
    };

    return response.json(user);
});

//Porta que ouviremos
app.listen(3333);