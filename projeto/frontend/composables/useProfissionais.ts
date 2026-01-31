import type { Profissional } from "~/types/profissional";

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

  return { list, create };
};