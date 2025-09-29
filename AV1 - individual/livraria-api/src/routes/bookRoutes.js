const express = require('express');
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook
} = require('../controllers/bookController');
const { authenticate, requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /books - Lista todos os livros (Usuário ou Admin)
router.get('/', authenticate, getBooks);

// GET /books/:id - Detalhes de um livro específico (Usuário ou Admin)
router.get('/:id', authenticate, getBookById);

// POST /books - Criar novo livro (APENAS Admin)
router.post('/', authenticate, requireAdmin, createBook);

// PATCH /books/:id - Atualizar livro existente (APENAS Admin)
router.patch('/:id', authenticate, requireAdmin, updateBook);

// DELETE /books/:id - Remover livro (APENAS Admin)
router.delete('/:id', authenticate, requireAdmin, deleteBook);

// POST /books/:id/borrow - "Pegar emprestado" (Usuário ou Admin)
router.post('/:id/borrow', authenticate, borrowBook);

// POST /books/:id/return - "Devolver" (Usuário ou Admin)
router.post('/:id/return', authenticate, returnBook);

module.exports = router;