import Usuario from '../models/Usuario.js';

export function abreIndex(req,res){
    res.render('index.ejs')
}

export function olaMundo(req,res){
    var nome = req.body.nome
    var cor = req.body.cor
    var turno = req.body.turno
    res.render('ola.ejs',{"nome":nome, "cor":cor, "turno":turno})
}

export function abreCalculadora(req,res,next){
    res.render('calculadora.ejs')
}

export function calculadora(req,res){
    var num1 = parseFloat(req.body.num1)
    var num2 = parseFloat(req.body.num2)
    var operacao = req.body.operacao
    var resultado = 0
    if (operacao == "somar"){
        resultado = num1 + num2
    } else if (operacao == "subtrair"){
        resultado = num1 - num2
    } else if (operacao == "multiplicar"){
        resultado = num1 * num2
    } else if (operacao == "dividir"){
        resultado = num1 / num2
    }
    res.render('resultado.ejs',{"resultado":resultado, "num1":num1, "num2":num2, "operacao":operacao})
}

export function abreTabuada(req,res){
    res.render('tabuada.ejs', {"num":"a"})
}

export function tabuada(req,res){
    var num = parseFloat(req.body.num)
    res.render('tabuada.ejs', {"num":num})
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

import Comentario from '../models/Comentario.js';

export function abreaddcomentario(req,res){
    res.render('addcomentario.ejs')
}

export function addcomentario(req,res){
    let comentario = new Comentario({
        nome: req.body.nome,
        email: req.body.email,
        turma: req.body.turma,
        comentario: req.body.comentario
    })
    comentario.save();
    res.redirect('/addcomentario')
}

export async function listarcomentarios(req,res){
    const comentarios = await Comentario.find({})
    //res.json(usuarios)
    res.render('listarcomentarios.ejs',{"Comentarios":comentarios})
}

export async function filtrarcomentarios(req,res){
    const filtro = req.body.filtro
    const comentarios = await Comentario.find({nome: new RegExp(filtro,'g')})
    res.render('listarcomentarios.ejs',{"Comentarios":comentarios})
}

export async function delcomentario(req,res){
    await Comentarios.findByIdAndDelete(req.params.id)
    res.redirect('/lstcomentarios')
}

export async function abreedtcomentario(req,res){
    const comentario = await Comentario.findById(req.params.id)
    res.render('edtusuario.ejs',{"Comentario":comentario})
}

export async function edtcomentario(req,res){
    const comentario = await Comentario.findById(req.params.id)
    comentario.nome = req.body.nome
    comentario.email = req.body.email
    comentario.turma = req.body.turma
    comentario.comentario = req.body.comentario
    await comentario.save()
    res.redirect('/lstcomentarios')
}