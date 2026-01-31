import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import {
  CreateNivelDTO,
  UpdateNivelDTO,
  NivelResponseDTO,
} from "../dtos/nivel.dto";

const router = Router();

// GET /api/niveis
router.get("/", async (_req: Request, res: Response) => {
  const niveis = await prisma.nivel.findMany();

  const response: NivelResponseDTO[] = niveis;

  res.json(response);
});

// POST /api/niveis
router.post("/", async (req: Request, res: Response) => {
  const data: CreateNivelDTO = req.body;

  if (!data.nivel) {
    return res.status(400).json({ message: 'Campo "nivel" é obrigatório' });
  }

  const novoNivel = await prisma.nivel.create({
    data: {
      nivel: data.nivel,
    },
  });

  const response: NivelResponseDTO = novoNivel;

  res.status(201).json(response);
});

// PUT /api/niveis/:id
router.put("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data: UpdateNivelDTO = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID inválido" });
  }

  if (!data.nivel) {
    return res.status(400).json({ message: 'Campo "nivel" é obrigatório' });
  }

  const existente = await prisma.nivel.findUnique({
    where: { id },
  });

  if (!existente) {
    return res.status(404).json({ message: "Nível não encontrado" });
  }

  const atualizado = await prisma.nivel.update({
    where: { id },
    data: {
      nivel: data.nivel,
    },
  });

  const response: NivelResponseDTO = atualizado;

  res.json(response);
});

// DELETE /api/niveis/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ message: "ID inválido" });
  }

  const existente = await prisma.nivel.findUnique({
    where: { id },
  });

  if (!existente) {
    return res.status(404).json({ message: "Nível não encontrado" });
  }

  //verificar se existem profissionais associados a este nível antes de deletar
  const profissionaisCount = await prisma.profissional.count({
    where: {
      nivelId: id,
    },
  });

  if (profissionaisCount > 0) {
    return res.status(409).json({
      message:
        "Não é possível excluir este nível pois existem profissionais associados a ele.",
    });
  }

  await prisma.nivel.delete({
    where: { id },
  });

  res.status(204).send();
});

export default router;
