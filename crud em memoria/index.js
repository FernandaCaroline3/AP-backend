import express from "express";

const app = express();

/**
 * Crud em memoria
 * criar uma rota para pegar todos os usuarios
 * criar uma rota pra cadastrar um usuario
 * criar uma rota pra atualizar um usuario
 * criar uma rota pra deletar um usuario
 */

const usuario_admin = {
    id: 1,
    nome: "angelo",
    email: "angelo@gmail.com"
}

let usuarios = [usuario_admin];

// pegar todos os usuarios
app.get("/usuarios", (req, res) => {
    res.json(usuarios).status(200);
});

// cadastrar um usuario
app.post("/usuarios", (req, res) => {
    const {nome, email} = req.body;
    if(!nome || !email){
        return res.status(400).json({message: "Nome e email são obrigatórios"});
    }
    const usuario = {
        id: usuarios.length + 1,
        nome,
        email
    };
    usuarios.push(usuario);
    res.json(usuario).status(201);
});

// atualizar um usuario
app.put("/usuarios/:id", (req, res) => {
    const {nome, email} = req.body;
    const id = req.params.id;
    usuarios[id] = {nome, email};
    res.json(usuarios[id]).status(200);
});

// deletar um usuario
app.delete("/usuarios/:id", (req, res) => {
    const id = req.params.id;
    usuarios.splice(id, 1);
    res.json("Usuario deletado").status(200);
});

app.listen(3000)
