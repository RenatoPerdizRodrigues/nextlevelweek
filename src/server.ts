import express, { response } from 'express';

//Devemos trazer não só o código, mas também sua definição de tipo
const app = express();

//Definimos que é JSON
app.use(express.json());

const users =["Renato","Lorran","Erick"];

app.get('/users', (request, response) => {

    const search = String(request.query.search);
    
    const filteredUsers = search ? users.filter(user => user.includes(search)) : users;
    response.json(filteredUsers);
});

app.get('/users/:id', (request, response) => {

    const id = Number(request.params.id);

    const user = users[id];

    response.json(user);
});

app.get('/', (request, response) => {
    response.json({"yee":"haaw"});
});

app.post('/users', (request,response) => {
    const user = {
        name: request.body.name,
        email: request.body.email,
    };

    return response.json(user);
});

app.listen(3333);