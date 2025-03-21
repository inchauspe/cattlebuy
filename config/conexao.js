import mongoose from "mongoose";

const conexao = await mongoose.connect("mongodb://aluno:aluno@ac-pcra3vd-shard-00-00.ajiapmy.mongodb.net:27017,ac-pcra3vd-shard-00-01.ajiapmy.mongodb.net:27017,ac-pcra3vd-shard-00-02.ajiapmy.mongodb.net:27017/?replicaSet=atlas-14e4b2-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0");

export default conexao;