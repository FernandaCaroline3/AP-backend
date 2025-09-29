// Importa o framework Express para criar o servidor web
const express = require('express');
// Importa o body-parser para interpretar o corpo das requisições (JSON e URL encoded)
const bodyParser = require('body-parser');
// Importa as rotas de autenticação
const authRoutes = require('./routes/authRoutes');
// Importa as rotas de livros
const bookRoutes = require('./routes/bookRoutes');

// Cria uma instância do aplicativo Express
const app = express();
// Define a porta do servidor (usa variável de ambiente ou 3000 como padrão)
const PORT = process.env.PORT || 3000;

// Configura o Express para aceitar requisições com corpo em JSON
app.use(bodyParser.json());
// Configura o Express para aceitar requisições com corpo em formato URL encoded
app.use(bodyParser.urlencoded({ extended: true }));

// Usa as rotas de autenticação no caminho /api/auth
app.use('/api/auth', authRoutes);
// Usa as rotas de livros no caminho /api/books
app.use('/api/books', bookRoutes);

// Inicia o servidor e exibe uma mensagem no console quando estiver rodando
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});