import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// GET /api/profissionais
router.get("/", async (_, res) => {
  const profissionais = await prisma.profissional.findMany({
    include: {
      nivel: true,
    },
  });

  res.json(profissionais);
});

// POST /api/profissionais
router.post("/", async (req, res) => {
  const { nome, sexo, data_nascimento, hobby, nivelId } = req.body;

  if (!nome || !sexo || !data_nascimento || !hobby || !nivelId) {
    return res.status(400).json({
      message: "Todos os campos são obrigatórios",
    });
  }

  const nivelExiste = await prisma.nivel.findUnique({
    where: { id: Number(nivelId) },
  });

  if (!nivelExiste) {
    return res.status(400).json({
      message: "Nível informado não existe",
    });
  }

  const profissional = await prisma.profissional.create({
    data: {
      nome,
      sexo,
      data_nascimento: new Date(data_nascimento),
      hobby,
      nivelId: Number(nivelId),
    },
  });

  res.status(201).json(profissional);
});

// PUT /api/profissionais/:id
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { nome, sexo, data_nascimento, hobby, nivelId } = req.body;

  const existente = await prisma.profissional.findUnique({
    where: { id },
  });

  if (!existente) {
    return res.status(404).json({ message: "Profissional não encontrado" });
  }

  if (nivelId) {
    const nivelExiste = await prisma.nivel.findUnique({
      where: { id: Number(nivelId) },
    });

    if (!nivelExiste) {
      return res.status(400).json({
        message: "Nível informado não existe",
      });
    }
  }

  const data: any = {
    nome,
    sexo,
    hobby,
  };

  if (data_nascimento) {
    data.data_nascimento = new Date(data_nascimento);
  }

  if (nivelId) {
    data.nivelId = Number(nivelId);
  }

  const atualizado = await prisma.profissional.update({
    where: { id },
    data,
  });

  res.json(atualizado);
});

// DELETE /api/profissionais/:id
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const existente = await prisma.profissional.findUnique({
    where: { id },
  });

  if (!existente) {
    return res.status(404).json({ message: "Profissional não encontrado" });
  }

  await prisma.profissional.delete({ where: { id } });
  res.status(204).send();
});

export default router;
