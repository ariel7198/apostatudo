export interface CreateProfissionalDTO {
  nome: string
  sexo: string
  data_nascimento: string 
  hobby: string
  nivelId: number
}

export interface UpdateProfissionalDTO {
  nome?: string
  sexo?: string
  data_nascimento?: string
  hobby?: string
  nivelId?: number
}

export interface ProfissionalResponseDTO {
  id: number
  nome: string
  sexo: string
  data_nascimento: string
  hobby: string
  nivel: {
    id: number
    nivel: string
  }
}