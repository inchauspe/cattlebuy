import mongoose from "mongoose";

const conexao = await mongoose.connect("mongodb+srv://aluno:aluno@cluster0.ajiapmy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default conexao;