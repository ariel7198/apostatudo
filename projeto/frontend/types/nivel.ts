import type { Profissional } from './profissional'

export interface Nivel {
  id: number
  nivel: string
  profissionais?: Profissional[]
}

export interface CreateNivelDTO {
  nivel: string
}