import conexao from '../config/conexao.js'

const Lote = conexao.Schema({
    raca: String,
    sexo: String,
    peso: Number,
    denticao: String,
    medicamentos: [String],
  });

export default conexao.model('Lote',Lote)