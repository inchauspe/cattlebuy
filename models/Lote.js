import conexao from '../config/conexao.js'
import mongoose from 'mongoose';

const LoteSchema = new mongoose.Schema({
  raca: String,
  sexo: String,
  peso: Number,
  denticao: String,
  medicamentos: [String],
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' } 
});

export default mongoose.model('Lote', LoteSchema);
