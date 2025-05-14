import express from 'express';
const router = express.Router();

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
        } from '../controllers/controllers.js';

router.get('/addusuario', abreaddusuario)
router.post('/addusuario',addusuario)

router.get('/lstusuarios',listarusuarios)
router.post('/lstusuarios',filtrarusuarios)

router.get("/edtusuario/:id",abreedtusuario)
router.post("/edtusuario/:id",edtusuario)

router.get('/addlote', abreaddlote)
router.post('/addlote', addlote)

router.get("/delusuario/:id",delusuario)
router.get("/",inicial)

export default router