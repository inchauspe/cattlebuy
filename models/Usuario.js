import conexao from "../config/conexao.js";

const usuarioSchema = new conexao.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    senha: {
        type: String,
        required: true,
    },
    foto: {
        type: String,
    },
});

const Usuario = conexao.model("Usuario", usuarioSchema);

export default Usuario;