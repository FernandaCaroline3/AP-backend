/**
 * Cria um novo livro (apenas admin).
 * - Title e Author são obrigatórios
 */
exports.createBook = async (req, res) => {
    const { title, author } = req.body;
    // Validação: title e author obrigatórios
    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required' });
    }
    try {
        const newBook = await prisma.book.create({
            data: { title, author }
        });
        res.status(201).json({ message: 'Book created', book: newBook });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create book' });
    }
};

/**
 * "Pegar emprestado" um livro (marca como indisponível).
 * - Usuário não pode pegar livro indisponível
 */
exports.borrowBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await prisma.book.findUnique({ where: { id: Number(id) } });
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        if (!book.available) {
            return res.status(400).json({ error: 'Book is already borrowed' });
        }
        await prisma.book.update({
            where: { id: Number(id) },
            data: { available: false }
        });
        res.json({ message: 'Book borrowed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to borrow book' });
    }
};