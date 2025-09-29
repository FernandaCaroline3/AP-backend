// Importa a classe PrismaClient do pacote @prisma/client para acessar o banco de dados
import { PrismaClient } from '@prisma/client';

// Cria uma instância do PrismaClient para executar consultas no banco
const prisma = new PrismaClient();

// Exporta a instância do Prisma para ser usada em outros arquivos do projeto
export default prisma;