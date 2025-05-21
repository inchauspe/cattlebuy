import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/routes.js'
import session from 'express-session';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('view engine', 'ejs');

app.use(session({
  secret: 'cattlebuy_seguro',
  resave: false,
  saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(routes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`);
});