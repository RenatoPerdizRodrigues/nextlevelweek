//Importando o express
import express, { response } from 'express';
//Importando as rotas
import routes from './routes';
import path from 'path';

//Definindo o express e configurando que recebe em JSON
const app = express();
app.use(express.json());

//Usamos as rotas
app.use(routes);

app.use('/uploads',express.static(path.resolve(__dirname, '..', 'uploads')));

//Porta que ouviremos
app.listen(3333);