import express from 'express';

//Devemos trazer não só o código, mas também sua definição de tipo
const app = express();

app.get('/users', (request, response) => {
    console.log(request.query.name);

    response.json({"msg":"userlist","user_list":[{"name":"Renato"},{"name":"Lorran"}]});
});

app.listen(3333);