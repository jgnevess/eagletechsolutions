export interface Response {
  status: number
  response?: LoginResponse | Error | UserOut
}

export type Role = "SOLICITANTE" | "ADMIN" | "TECNICO";

export interface UserOut {
  matricula: number;
  nomeCompleto: string;
  telefone: string;
  funcao: Role;
  email: string;
  ativo: boolean
}

export interface LoginResponse {
  token: string
  role: string
  firstLogin: boolean
  matricula: number
  user: UserOut
}

export interface Error {
  status?: number
  Error: string
}

export interface UserIn {
  nomeCompleto: string;
  senha: string;
  telefone: string;
  funcao: string;
  email: string;
}

export interface LoginDto {
  matricula: string
  password: string
}