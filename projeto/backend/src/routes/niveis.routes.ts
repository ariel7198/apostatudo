import { Router } from 'express'
import { prisma } from '../lib/prisma'

const router = Router()

// GET /api/niveis
router.get('/', async (_, res) => {
  const niveis = await prisma.nivel.findMany()
  res.json(niveis)
})

// POST /api/niveis
router.post('/', async (req, res) => {
  const { nivel } = req.body

  if (!nivel) {
    return res.status(400).json({ message: 'Campo "nivel" é obrigatório' })
  }

  const novoNivel = await prisma.nivel.create({
    data: { nivel }
  })

  res.status(201).json(novoNivel)
})

// PUT /api/niveis/:id
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { nivel } = req.body

  if (!nivel) {
    return res.status(400).json({ message: 'Campo "nivel" é obrigatório' })
  }

  const existente = await prisma.nivel.findUnique({ where: { id } })
  if (!existente) {
    return res.status(404).json({ message: 'Nível não encontrado' })
  }

  const atualizado = await prisma.nivel.update({
    where: { id },
    data: { nivel }
  })

  res.json(atualizado)
})

// DELETE /api/niveis/:id
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)

  const existente = await prisma.nivel.findUnique({ where: { id } })
  if (!existente) {
    return res.status(404).json({ message: 'Nível não encontrado' })
  }

  await prisma.nivel.delete({ where: { id } })
  res.status(204).send()
})

export default router
