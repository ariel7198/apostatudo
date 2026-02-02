import type { Nivel, CreateNivelDTO } from "~/types/nivel";

export const useNiveis = () => {
  const api = useApi();

  const list = () => {
    return api.get<Nivel[]>("/niveis");
  };

  const create = (data: CreateNivelDTO) => {
    return api.post<Nivel>("/niveis", data);
  };

  const del = (id: number) => {
    return api.del(`/niveis/${id}`);
  }

  const update = (id: number, data: { nivel: string }) => {
    return api.put<Nivel>(`/niveis/${id}`, data);
  }


  return { list, create, del, update };
};