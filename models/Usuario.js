import conexao from '../config/conexao.js'

const Usuario = conexao.Schema({
    nome: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    senha: {type:String, required:true},
    foto: 'String',
})

export default conexao.model('Usuario',Usuario)