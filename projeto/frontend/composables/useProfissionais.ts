import type { Profissional } from "~/types/profissional";
import { useApi } from "#imports";

export const useProfissionais = () => {
  const api = useApi();

  const list = () => {
    return api.get<Profissional[]>("/profissionais");
  };

  const create = (data: {
    nome: string;
    sexo: string;
    data_nascimento: string;
    hobby: string;
    nivelId: number;
  }) => {
    return api.post<Profissional>("/profissionais", data);
  };

  const del = (id: number) => {
    return api.del(`/profissionais/${id}`);
  }

  const updateNivel = (id: number, nivelId: number) => {
    return api.put(`/profissionais/${id}`, { nivelId });
  }

  const updateProfissional = (id: number, data: {
    nome: string;
    sexo: string;
    data_nascimento: string;
    hobby: string;
  }) => {
    return api.put<Profissional>(`/profissionais/${id}`, data);
  } ;

  return { list, create, updateNivel, updateProfissional, del };
};