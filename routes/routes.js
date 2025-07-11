import express from 'express';
import { protegerLogin, protegerPorTipo } from '../middlewares/authMiddleware.js';
const router = express.Router();
import multer from 'multer';
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ dest: 'public/uploads/' });

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
            abreprodutor,
            abrecomprador,
            painelAdmin,
            dashboard,
            perfilUsuario,
            atualizarPerfil,
            abreAjuda,
            abreSobre,
        } from '../controllers/controllers.js';

router.get('/addusuario', abreaddusuario)
router.post('/addusuario',addusuario)

router.get('/lstusuarios',listarusuarios)
router.post('/lstusuarios',filtrarusuarios)

router.get("/edtusuario",abreedtusuario)
router.post("/edtusuario",edtusuario)

router.get('/addlote', protegerLogin, protegerPorTipo('Produtor'), abreaddlote);
router.post('/addlote', protegerLogin, protegerPorTipo('Produtor'), addlote);

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
router.post('/registro', upload.single('foto'), registro);

router.get('/logout', logout);

router.get('/produtorHome', protegerLogin, protegerPorTipo('Produtor'), abreprodutor);

router.get('/compradorHome', protegerLogin, protegerPorTipo('Comprador'), abrecomprador);

router.get('/dashboard', protegerLogin, protegerPorTipo('Admin'), painelAdmin);
router.post('/dashboard', dashboard)

router.get('/perfil', protegerLogin, perfilUsuario);
router.post('/perfil', protegerLogin, upload.single('foto'), atualizarPerfil);

router.get('/sobre', abreSobre);
router.get('/ajuda', abreAjuda);

export default router