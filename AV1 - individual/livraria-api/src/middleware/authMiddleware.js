const prisma = require('../prisma/client');
const bcrypt = require('bcrypt');

/**
 * Decodifica o token Basic Auth do header Authorization.
 * Retorna { username, password } ou null se inválido.
 */
function parseBasicAuth(header) {
  if (!header || !header.startsWith('Basic ')) return null;
  const base64 = header.split(' ')[1];
  const [username, password] = Buffer.from(base64, 'base64').toString().split(':');
  return { username, password };
}

/**
 * Middleware de autenticação.
 * - Decodifica o token Basic Auth
 * - Busca usuário no banco
 * - Retorna 401 se não autenticado
 */
async function authenticate(req, res, next) {
  const auth = parseBasicAuth(req.headers.authorization);
  if (!auth) return res.status(401).json({ error: 'Missing or invalid Authorization header' });

  const user = await prisma.user.findUnique({ where: { username: auth.username } });
  if (!user || !(await bcrypt.compare(auth.password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  req.user = user;
  next();
}

/**
 * Middleware de autorização para admin.
 * - Busca usuário no banco (já feito pelo authenticate)
 * - Verifica se é admin
 * - Retorna 403 se não for admin
 */
function requireAdmin(req, res, next) {
  if (!req.user?.isAdmin) return res.status(403).json({ error: 'Admin access required' });
  next();
}

module.exports = { authenticate, requireAdmin };