import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import {
  CreateProfissionalDTO,
  UpdateProfissionalDTO,
  ProfissionalResponseDTO,
} from "../dtos/profissionais.dto";

const router = Router();

// GET /api/profissionais
router.get("/", async (_req: Request, res: Response) => {
  const profissionais = await prisma.profissional.findMany({
    include: { nivel: true },
  });

  const response: ProfissionalResponseDTO[] = profissionais.map((p) => ({
    id: p.id,
    nome: p.nome,
    sexo: p.sexo,
    data_nascimento: p.data_nascimento.toISOString(),
    hobby: p.hobby,
    nivelId: p.nivelId,
    nivel: {
      id: p.nivel.id,
      nivel: p.nivel.nivel,
    },
  }));

  res.json(response);
});

// POST /api/profissionais
router.post("/", async (req: Request, res: Response) => {
  const data: CreateProfissionalDTO = req.body;

  const { nome, sexo, data_nascimento, hobby, nivelId } = data;

  if (!nome || !sexo || !data_nascimento || !hobby || !nivelId) {
    return res.status(400).json({ message: "Campos obrigatórios ausentes" });
  }

  const nivelExiste = await prisma.nivel.findUnique({
    where: { id: nivelId },
  });

  if (!nivelExiste) {
    return res.status(400).json({ message: "Nível inválido" });
  }

  const novoProfissional = await prisma.profissional.create({
    data: {
      nome,
      sexo,
      hobby,
      nivelId,
      data_nascimento: new Date(data_nascimento),
    },
    include: {
      nivel: true,
    },
  });

  const response: ProfissionalResponseDTO = {
    id: novoProfissional.id,
    nome: novoProfissional.nome,
    sexo: novoProfissional.sexo,
    data_nascimento: novoProfissional.data_nascimento.toISOString(),
    hobby: novoProfissional.hobby,
    nivel: {
      id: novoProfissional.nivel.id,
      nivel: novoProfissional.nivel.nivel,
    },
  };

  res.status(201).json(response);
});

// PATCH /api/profissionais/:id
router.patch("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data: UpdateProfissionalDTO = req.body;

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  const existente = await prisma.profissional.findUnique({
    where: { id },
  });

  if (!existente) {
    return res.status(404).json({ message: "Profissional não encontrado" });
  }

  if (data.nivelId) {
    const nivelExiste = await prisma.nivel.findUnique({
      where: { id: data.nivelId },
    });

    if (!nivelExiste) {
      return res.status(400).json({ message: "Nível inválido" });
    }
  }

  const atualizado = await prisma.profissional.update({
    where: { id },
    data: {
      ...data,
      ...(data.data_nascimento && {
        data_nascimento: new Date(data.data_nascimento),
      }),
    },
    include: {
      nivel: true,
    },
  });

  const response: ProfissionalResponseDTO = {
    id: atualizado.id,
    nome: atualizado.nome,
    sexo: atualizado.sexo,
    data_nascimento: atualizado.data_nascimento.toISOString(),
    hobby: atualizado.hobby,
    nivel: {
      id: atualizado.nivel.id,
      nivel: atualizado.nivel.nivel,
    },
  };

  res.json(response);
});

// DELETE /api/profissionais/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  const existente = await prisma.profissional.findUnique({
    where: { id },
  });

  if (!existente) {
    return res.status(404).json({ message: "Profissional não encontrado" });
  }

  await prisma.profissional.delete({
    where: { id },
  });

  res.status(204).send();
});

export default router;
