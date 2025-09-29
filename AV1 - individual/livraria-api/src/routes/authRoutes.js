// Importa o Express para criar rotas
const express = require('express');
// Importa os controladores de autenticação para lidar com registro e login
const { register, login } = require('../controllers/authController');

// Cria um roteador do Express para as rotas de autenticação
const router = express.Router();

// Rota para registrar um novo usuário
router.post('/register', register);
// Rota para login do usuário
router.post('/login', login);

// Exporta o roteador para ser usado no app principal
module.exports = router;