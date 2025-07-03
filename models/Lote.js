import conexao from '../config/conexao.js'
import mongoose from 'mongoose';

const LoteSchema = new mongoose.Schema({
  raca: String,
  sexo: String,
  peso: Number,
  denticao: String,
  preco: Number,       // se usar preço
  quantidade: Number,  // se usar quantidade
  medicamentos: [String],
  usuario: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario',
    required: true
  }
});

export default mongoose.model('Lote', LoteSchema);
