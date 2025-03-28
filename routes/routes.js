import express from 'express';
const router = express.Router();

import { 
            olaMundo, 
            tabuada,
            calculadora,
            abreCalculadora,
            abreIndex,
            abreTabuada,
            abreaddusuario,
            addusuario,
            listarusuarios,
            filtrarusuarios,
            delusuario,
            abreedtusuario,
            edtusuario
        } from '../controllers/controllers.js';

router.get('/formulario',abreIndex)
router.post('/formulario',olaMundo)
router.get('/calculadora',abreCalculadora)
router.post('/calculadora',calculadora)
router.get('/tabuada',abreTabuada)
router.post('/tabuada',tabuada)

router.get('/addusuario', abreaddusuario)
router.post('/addusuario',addusuario)

router.get('/lstusuarios',listarusuarios)
router.post('/lstusuarios',filtrarusuarios)

router.get("/edtusuario/:id",abreedtusuario)
router.post("/edtusuario/:id",edtusuario)

router.get("/delusuario/:id",delusuario)

export default router