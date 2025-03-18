import express from 'express';
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

import rotas from './routes/routes.js';

app.use(rotas);

app.listen(3000)