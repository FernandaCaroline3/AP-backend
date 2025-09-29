// Middleware para verificar se o usuário é administrador
exports.isAdmin = (req, res, next) => {
    // Verifica se existe usuário na requisição e se o campo role é 'admin'
    if (req.user && req.user.role === 'admin') {
        // Se for admin, permite continuar para a próxima função
        next();
    } else {
        // Se não for admin, retorna erro 403 (acesso negado)
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};

// Middleware para verificar se o usuário é usuário comum
exports.isRegularUser = (req, res, next) => {
    // Verifica se existe usuário na requisição e se o campo role é 'user'
    if (req.user && req.user.role === 'user') {
        // Se for usuário comum, permite continuar para a próxima função
        next();
    } else {
        // Se não for usuário comum, retorna erro 403 (acesso negado)
        return res.status(403).json({ message: 'Access denied. Regular users only.' });
    }
};