import conexao from '../config/conexao.js'

const Lote = conexao.Schema({
    idade: {type:Number, required:true},
    sexo: {type:String, required:true},
    raca: {type:String, required:true, unique:true},
    medicamentos: {type:String, required:true},
    foto: 'String',
})

export default conexao.model('Lote',Lote)