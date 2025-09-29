const bcrypt = require('bcrypt');
const prisma = require('../prisma/client');

/**
 * Registra um novo usuário.
 * - Username deve ser único
 * - Password mínimo 4 caracteres
 * - Primeiro usuário criado é admin
 */
const register = async (req, res) => {
    const { username, password } = req.body;

    // Validação: username e password obrigatórios
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    // Validação: password mínimo 4 caracteres
    if (password.length < 4) {
        return res.status(400).json({ error: 'Password must be at least 4 characters' });
    }

    // Verifica se já existe usuário com esse username
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    // Verifica se é o primeiro usuário (admin)
    const userCount = await prisma.user.count();
    const isAdmin = userCount === 0;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                isAdmin
            }
        });
        res.status(201).json({ message: 'User registered successfully', userId: user.id });
    } catch (error) {
        res.status(500).json({ error: 'User registration failed' });
    }
};

module.exports = { register };