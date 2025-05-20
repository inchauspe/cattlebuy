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
            listarlote,
            filtrarlote,
            dellote,
            abreedtlote,
            edtlote,
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

export default router