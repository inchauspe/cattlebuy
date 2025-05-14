import Usuario from '../models/Usuario.js';
import Lote from '../models/Lote.js';

export function abreIndex(req,res){
    res.render('index.ejs')
}

export function olaMundo(req,res){
    var nome = req.body.nome
    var cor = req.body.cor
    var turno = req.body.turno
    res.render('ola.ejs',{"nome":nome, "cor":cor, "turno":turno})
}

export function abreaddusuario(req,res){
    res.render('addusuario.ejs')
}

export function addusuario(req,res){
    let usuario = new Usuario({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        foto: req.body.foto
    })
    usuario.save();
    res.redirect('/addusuario')
}

export async function listarusuarios(req,res){
    const usuarios = await Usuario.find({})
    //res.json(usuarios)
    res.render('listarusuarios.ejs',{"Usuarios":usuarios})
}

export async function filtrarusuarios(req,res){
    const filtro = req.body.filtro
    const usuarios = await Usuario.find({nome: new RegExp(filtro,'g')})
    res.render('listarusuarios.ejs',{"Usuarios":usuarios})
}

export async function delusuario(req,res){
    await Usuario.findByIdAndDelete(req.params.id)
    res.redirect('/lstusuarios')
}

export async function abreedtusuario(req,res){
    const usuario = await Usuario.findById(req.params.id)
    res.render('edtusuario.ejs',{"Usuario":usuario})
}

export async function edtusuario(req,res){
    const usuario = await Usuario.findById(req.params.id)
    usuario.nome = req.body.nome
    usuario.email = req.body.email
    usuario.senha = req.body.senha
    usuario.foto = req.body.foto
    await usuario.save()
    res.redirect('/lstusuarios')
}

export function abreaddlote(req,res){
    res.render('addlote.ejs')
}

export function addlote(req,res){
    let lote = new Lote({
        sexo: req.body.raca,
        raca: req.body.raca,
        medicamentos: req.body.medicamentos,
        foto: req.body.foto
    })
    lote.save();
    res.redirect('/addlote')
}

export async function listarlote(req,res){
    const lote = await Lote.find({})
    //res.json(lote)
    res.render('listarlote.ejs',{"Lote":lote})
}

export async function filtrarlote(req,res){
    const filtro = req.body.filtro
    const lote = await Lote.find({sexo: new RegExp(filtro,'g')})
    res.render('listarlote.ejs',{"Lote":lote})
}

export async function dellote(req,res){
    await Lote.findByIdAndDelete(req.params.id)
    res.redirect('/lstlote')
}

export async function abreedtlote(req,res){
    const lote = await Lote.findById(req.params.id)
    res.render('edtlote.ejs',{"Lote":lote})
}

export async function edtlote(req,res){
    const lote = await Lote.findById(req.params.id)
    lote.sexo = req.body.sexo
    lote.raca = req.body.raca
    lote.medicamentos = req.body.medicamentos
    lote.foto = req.body.foto
    await lote.save()
    res.redirect('/lstlote')
}

