import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  await prisma.profissional.deleteMany()
  await prisma.nivel.deleteMany()


  // NÍVEIS (20)
  const niveis = await Promise.all(
    Array.from({ length: 20 }).map((_, i) =>
      prisma.nivel.create({
        data: {
          nivel: `Nível ${i + 1}`,
        },
      })
    )
  )


  // PROFISSIONAIS (40)
  const nomes = [
    'João', 'Maria', 'Carlos', 'Ana', 'Pedro',
    'Lucas', 'Fernanda', 'Rafael', 'Juliana', 'Bruno',
  ]

  const sobrenomes = [
    'Silva', 'Souza', 'Oliveira', 'Lima', 'Pereira',
    'Costa', 'Rodrigues', 'Alves', 'Gomes', 'Ribeiro',
  ]

  const hobbies = [
    'Leitura',
    'Corrida',
    'Fotografia',
    'Cozinhar',
    'Música',
    'Viajar',
    'Academia',
    'Jogos',
  ]

  const profissionais = Array.from({ length: 40 }).map((_, i) => {
    const nome =
      `${nomes[i % nomes.length]} ${sobrenomes[i % sobrenomes.length]}`

    return {
      nome,
      sexo: i % 2 === 0 ? 'M' : 'F',
      data_nascimento: new Date(
        1985 + (i % 15), // anos variados
        i % 12,
        (i % 28) + 1
      ),
      hobby: hobbies[i % hobbies.length] ?? 'Sem hobby',
      nivelId: niveis[i % niveis.length]!.id,
    }
  })

  await prisma.profissional.createMany({
    data: profissionais,
  })

  console.log('Seed finalizado com sucesso 🚀')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
