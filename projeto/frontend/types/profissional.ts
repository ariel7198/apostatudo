import type { Nivel } from './nivel'

export interface Profissional {
  id: number
  nome: string
  sexo: string
  data_nascimento: string 
  hobby: string
  nivelId: number
  nivel?: Nivel
}