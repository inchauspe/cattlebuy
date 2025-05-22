import conexao from '../config/conexao.js'

const Usuario = conexao.Schema({
    id: {type: Number, required: true},
    nome: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    senha: {type:String, required:true},
    tipo: {type: String, enum: ['Comprador', 'Produtor', 'Admin'], required: true},
    foto: 'String',
})

export default conexao.model('Usuario',Usuario)