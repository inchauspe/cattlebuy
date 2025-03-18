import express from 'express';
const router = express.Router();

import { 
            olaMundo, 
            tabuada,
            calculadora,
            abreCalculadora,
            abreIndex,
            abreTabuada,
            abreaddusuario 
        } from '../controllers/controllers.js';

router.get('/formulario',abreIndex)
router.post('/formulario',olaMundo)
router.get('/calculadora',abreCalculadora)
router.post('/calculadora',calculadora)
router.get('/tabuada',abreTabuada)
router.post('/tabuada',tabuada)

router.get('/addusuario', abreaddusuario)

export default router