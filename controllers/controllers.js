import Usuario from '../models/Usuario.js';
import Lote from '../models/Lote.js';
import bcrypt from 'bcrypt'; 

// FUNÇÃO INICIAL
export function inicial(req,res){
    res.render('index.ejs');
}

// FUNÇÕES DO USUÁRIO
export function abreaddusuario(req,res){
    res.render('usuario/add');
}

export function addusuario(req,res){
    let usuario = new Usuario({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        foto: req.body.foto
    });
    usuario.save();
    res.redirect('/lstusuarios');
}

export async function listarusuarios(req, res) {
  const usuarios = await Usuario.find({});
  res.render('usuario/lst', { usuarios }); 
}

export async function filtrarusuarios(req,res){
    const filtro = req.body.filtro;
    const usuarios = await Usuario.find({nome: new RegExp(filtro,'g')});
    res.render('listarusuarios.ejs',{"Usuarios":usuarios});
}

export async function delusuario(req,res){
    await Usuario.findByIdAndDelete(req.params.id);
    res.redirect('/lstusuarios');
}

export async function abreedtusuario(req, res) {
  const usuario = await Usuario.findById(req.params.id);
  res.render('usuario/edt', { usuario }); 
}

export async function edtusuario(req,res){
    const usuario = await Usuario.findById(req.params.id);
    usuario.nome = req.body.nome;
    usuario.email = req.body.email;
    usuario.senha = req.body.senha;
    usuario.foto = req.body.foto;
    await usuario.save();
    res.redirect('/lstusuario');
}

// FUNÇÕES DO LOTE
export function abreaddlote(req,res){
    res.render('lote/add');
}

export async function addlote(req, res) {
  try {
    const medicamentos = Array.isArray(req.body.medicamentos)
      ? req.body.medicamentos
      : [req.body.medicamentos];

    let lote = new Lote({
      raca: req.body.raca,
      sexo: req.body.sexo,
      peso: req.body.peso,
      denticao: req.body.denticao,
      medicamentos: medicamentos,
      usuario: req.session.usuario.id //
    });

    await lote.save();
    res.redirect('/produtorHome');
  } catch (err) {
    console.error("Erro ao salvar lote:", err);
    res.status(500).send("Erro ao salvar lote.");
  }
}

export const listarlote = async (req, res) => {
  try {
    const lotes = await Lote.find();
    res.render('lote/lst', { lotes });
  } catch (error) {
    res.status(500).send('Erro ao listar os lotes.');
  }
};

export async function filtrarlote(req,res){
    const filtro = req.body.filtro;
    const lote = await Lote.find({sexo: new RegExp(filtro,'g')});
    res.render('listarlote.ejs',{"Lote":lote});
}

export async function dellote(req,res){
    await Lote.findByIdAndDelete(req.params.id);
    res.redirect('/lstlote');
}

export async function abreedtlote(req,res){
    const lote = await Lote.findById(req.params.id);
    res.render('lote/edtlote', { Lote: lote });
}

export async function edtlote(req,res){
    const lote = await Lote.findById(req.params.id);
    lote.id = req.body.id;
    lote.idade = req.body.idade;
    lote.sexo = req.body.sexo;
    lote.raca = req.body.raca;
    lote.medicamentos = req.body.medicamentos;
    lote.peso = req.body.peso;
    await lote.save();
    res.redirect('/lstlote');
}

// FUNÇÕES DE LOGIN E REGISTRO
export const abreregistro = (req, res) => {
  res.render('registro');
};

export const registro = async (req, res) => {
  try {
    const { nome, email, senha, tipo, cidade, estado, numero } = req.body;
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

    const novoUsuario = new Usuario({
      nome,
      email,
      senha: senhaHash,
      foto,
      tipo,
      cidade: tipo === 'Produtor' ? cidade : '',
      estado: tipo === 'Produtor' ? estado : '',
      numero: tipo === 'Produtor' ? numero : ''
    });
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

    if (usuario.tipo === 'Admin') {
      res.redirect('/dashboard');
    } else if (usuario.tipo === 'Comprador') {
      res.redirect('/compradorHome');
    } else if (usuario.tipo === 'Produtor') {
      res.redirect('/produtorHome');
    } else {
      res.redirect('/login');
    }

  } catch (err) {
    res.status(500).send('Erro ao fazer login.');
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};

// TELA DO PRODUTOR
export async function abreprodutor(req, res) {
  try {
    const idProdutor = req.session.usuario.id;
    const lotesProdutor = await Lote.find({ usuario: idProdutor }).populate('usuario');
    res.render('produtorHome', {
      lotesProdutor,
      usuario: req.session.usuario
    });
  } catch (err) {
    console.error("Erro ao buscar lotes do produtor:", err);
    res.status(500).send("Erro interno ao carregar a página do produtor.");
  }
}

// TELA DO COMPRADOR
export async function abrecomprador(req, res) {
  try {
    const lotes = await Lote.find().populate('usuario', 'nome cidade estado numero');
    res.render('compradorHome', { lotes });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
}

// TELA DO ADMIN
export function painelAdmin(req, res) {
  res.render('dashboard');
}

export function dashboard(req,res){
  res.redirect('/addlote');
}

// PERFIL
export async function perfilUsuario(req, res) {
  try {
    if (!req.session.usuario) {
      return res.redirect('/login');
    }
    const usuario = await Usuario.findById(req.session.usuario.id);
    if (!usuario) {
      return res.status(404).send('Usuário não encontrado.');
    }
    res.render('perfil', { usuario, tipoUsuario: req.session.usuario.tipo });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao carregar perfil.');
  }
}

export async function atualizarPerfil(req, res) {
  try {
    if (!req.session.usuario) {
      return res.redirect('/login');
    }
    const usuario = await Usuario.findById(req.session.usuario.id);
    if (!usuario) {
      return res.status(404).send('Usuário não encontrado.');
    }

    usuario.nome = req.body.nome || usuario.nome;
    usuario.email = req.body.email || usuario.email;

    if (req.body.senha && req.body.senha.trim() !== '') {
      const senhaHash = await bcrypt.hash(req.body.senha, 10);
      usuario.senha = senhaHash;
    }

    if (req.file) {
      usuario.foto = req.file.filename;
    }

    await usuario.save();
    res.redirect('/perfil');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao atualizar perfil.');
  }
}

// PÁGINAS ESTÁTICAS: SOBRE E AJUDA
export function abreSobre(req, res) {
  res.render('sobre');
}

export function abreAjuda(req, res) {
  res.render('ajuda');
}
