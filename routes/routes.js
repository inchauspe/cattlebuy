import express from 'express';
const router = express.Router();
import multer from 'multer';
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

import { 
            inicial,
            abreaddusuario,
            addusuario,
            listarusuarios,
            filtrarusuarios,
            delusuario,
            abreedtusuario,
            edtusuario,
            abreaddlote,
            addlote,     
            listarlote,
            filtrarlote,
            dellote,
            abreedtlote,
            edtlote,
            abrelogin,
            login,
            abreregistro,
            registro,
            logout,
            home, 
        } from '../controllers/controllers.js';

router.get('/addusuario', abreaddusuario)
router.post('/addusuario',addusuario)

router.get('/lstusuarios',listarusuarios)
router.post('/lstusuarios',filtrarusuarios)

router.get("/edtusuario",abreedtusuario)
router.post("/edtusuario",edtusuario)

router.get('/addlote', abreaddlote)
router.post('/addlote', addlote)

router.get("/delusuario/:id",delusuario)

router.get('/lstlote', listarlote)
router.post('/lstlote', filtrarlote)

router.get('/edtlote/:id', abreedtlote)
router.post('/edtlote/:id', edtlote)

router.get('/dellote/:id', dellote)

router.get("/",inicial)

router.get('/login', abrelogin);
router.post('/login', login);

router.get('/registro', abreregistro);
router.post('/registro', registro);

router.get('/logout', logout);

router.get('/home', home);

export default router