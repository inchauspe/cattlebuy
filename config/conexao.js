import mongoose from 'mongoose';

//const conexao = await mongoose.connect("mongodb://aluno:aluno@cluster0-shard-00-00.wsama.mongodb.net:27017,cluster0-shard-00-01.wsama.mongodb.net:27017,cluster0-shard-00-02.wsama.mongodb.net:27017/?replicaSet=atlas-mmn1oq-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0")
const conexao = await mongoose.connect('mongodb://localhost:27017/banco')

export default conexao j