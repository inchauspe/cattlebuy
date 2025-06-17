import Usuario from '../models/Usuario.js';
import Lote from '../models/Lote.js';
import bcrypt from 'bcrypt'; 

//FUNÇÃO INICIAL
export function inicial(req,res){
    res.render('index.ejs')
}

//FUNÇÕES DO USUARIO
export function abreaddusuario(req,res){
    res.render('usuario/add')
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

export async function listarusuarios(req, res) {
  const usuarios = await Usuario.find({});
  res.render('usuario/lst', { usuarios }); 
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

export async function abreedtusuario(req, res) {
  const usuario = await Usuario.findById(req.params.id);
  res.render('usuario/edt', { usuario }); 
}

export async function edtusuario(req,res){
    const usuario = await Usuario.findById(req.params.id)
    usuario.nome = req.body.nome
    usuario.email = req.body.email
    usuario.senha = req.body.senha
    usuario.foto = req.body.foto
    await usuario.save()
    res.redirect('/lstusuario')
}

//FUNÇÕES DO LOTE
export function abreaddlote(req,res){
    res.render('lote/add')
}

export function addlote(req,res){
    let lote = new Lote({
        id: req.body.id,
        idade: req.body.idade,
        sexo: req.body.sexo,
        raca: req.body.raca,
        medicamentos: req.body.medicamentos,
        peso: req.body.peso,
    })
    lote.save();
    res.redirect('/addlote')
}

export async function listarlote(req,res){
    const lote = await Lote.find({})
    res.render('lote/lst', { Lote: lote });

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
    res.render('lote/edtlote', { Lote: lote });
}

export async function edtlote(req,res){
    const lote = await Lote.findById(req.params.id)
    lote.id = req.body.id
    lote.idade = req.body.idade
    lote.sexo = req.body.sexo
    lote.raca = req.body.raca
    lote.medicamentos = req.body.medicamentos
    lote.peso = req.body.peso
    await lote.save()
    res.redirect('/lstlote')
}

//FUNÇÕES DE LOGIN E REGISTRO
export const abreregistro = (req, res) => {
  res.render('registro');
};

export const registro = async (req, res) => {
  try {
    const { nome, email, senha, tipo } = req.body;
    const tipoValido = ['Comprador', 'Produtor', 'Admin'];
    if (!tipoValido.includes(tipo)) {
      return res.status(400).send('Tipo de usuário inválido.');
    }

    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.send('Email já cadastrado.');
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const foto = req.file ? req.file.filename : null;

    const novoUsuario = new Usuario({ nome, email, senha: senhaHash, foto, tipo });
    await novoUsuario.save();
    res.redirect('/login');
  } catch (err) {
    res.status(500).send('Erro ao registrar usuário.');
  }
};

export const abrelogin = (req, res) => {
  res.render('login');
};

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.send('Usuário não encontrado.');

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) return res.send('Senha incorreta.');

    req.session.usuario = {
      id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
      tipo: usuario.tipo
    };

    // Redireciona conforme o tipo
    if (usuario.tipo === 'Admin') {
      res.redirect('/lstusuarios');
    } else {
      res.redirect('/lstlote');
    }

  } catch (err) {
    res.status(500).send('Erro ao fazer login.');
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};

//TELA DO PRODUTOR
export function abreprodutor(req,res){
  res.render('produtorHome')
}

export function produtorHome(req,res){
  res.redirect('/addlote')
}

//TELA DO ADMIN
export function painelAdmin(req, res) {
  res.render('dashboard');
}

export function dashboard(req,res){
  res.redirect('/addlote')
}