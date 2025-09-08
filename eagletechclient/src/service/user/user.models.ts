import { UserOut as UserOut } from "../login/login.models"

export interface SimplePasswordUpdate {
  matricula: number
  newPassword: string
  confirmNewPassword: string
}

export interface Response {
  status: number
  response?: Error | UserOut | UserOut[]
}

export interface Error {
  Error: string
}

export interface UserUpdateIn {
  matricula: number;
  nomeCompleto: string;
  telefone: string;
  funcao: string;
  email: string;
}

export interface PasswordUpdate {
  matricula: number;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}