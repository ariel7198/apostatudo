import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  await prisma.profissional.deleteMany()
  await prisma.nivel.deleteMany()

  // criar os niveis
  const junior = await prisma.nivel.create({
    data: { nivel: 'Júnior' },
  })

  const pleno = await prisma.nivel.create({
    data: { nivel: 'Pleno' },
  })

  const senior = await prisma.nivel.create({
    data: { nivel: 'Sênior' },
  })

  // cria alguns profissionais de exemplo
  await prisma.profissional.createMany({
    data: [
      {
        nome: 'João Silva',
        sexo: 'M',
        data_nascimento: new Date('1995-05-10'),
        hobby: 'Correr',
        nivelId: junior.id,
      },
      {
        nome: 'Maria Souza',
        sexo: 'F',
        data_nascimento: new Date('1990-09-20'),
        hobby: 'Leitura',
        nivelId: pleno.id,
      },
      {
        nome: 'Carlos Lima',
        sexo: 'M',
        data_nascimento: new Date('1988-01-15'),
        hobby: 'Fotografia',
        nivelId: senior.id,
      },
    ],
  })

  console.log('Seed finalizado com sucesso')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
