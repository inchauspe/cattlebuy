import conexao from '../config/conexao.js'

const Comentario = conexao.Schema({
    nome: {type:String, required:true},
    email: {type:String, required:true},
    turma: {type:String, required:true},
    comentario: 'String',
})

export default conexao.model('Comentario',Comentario)