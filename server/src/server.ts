//Importando o express
import express, { response } from 'express';
//Importando as rotas
import routes from './routes';
import cors from 'cors';
import path from 'path';
import { errors } from 'celebrate';


//Definindo o express e configurando que recebe em JSON
const app = express();

//Iniciamos o CORS
app.use(cors());
app.use(express.json());

//Usamos as rotas
app.use(routes);

//Passamos uma rota estática para recuperarmos imagens
app.use('/uploads',express.static(path.resolve(__dirname, '..', 'uploads')));

//Erros
app.use(errors());

//Porta que ouviremos
app.listen(3333);