//Importando o express
import express, { response } from 'express';
//Importando as rotas
import routes from './routes';

//Definindo o express e configurando que recebe em JSON
const app = express();
app.use(express.json());

//Usamos as rotas
app.use(routes);

//Porta que ouviremos
app.listen(3333);