// Importa a classe PrismaClient do pacote @prisma/client para acessar o banco de dados
import { PrismaClient } from '@prisma/client';

// Cria uma instância do PrismaClient para executar consultas no banco
const prisma = new PrismaClient();

// Cria referências para os modelos User e Book do Prisma
const User = prisma.user;
const Book = prisma.book;

// Exporta os modelos para serem usados em outros arquivos do projeto
export { User, Book };