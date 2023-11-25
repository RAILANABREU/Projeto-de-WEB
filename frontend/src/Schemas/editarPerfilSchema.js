import { z } from "zod";

const transformToNull = (value) => (value === "" ? null : value);

export const editarPerfilSchema = z.object({
  nome: z
    .string()
    .transform(transformToNull)
    .refine((name) => {
      if (name !== null && name !== undefined) {
        return name.trim().length >= 3;
      }
      return true;
    }, { message: "Nome deve ter no mínimo 3 caracteres" })
    .transform((name) =>
      name
        ? name
            .trim()
            .split(" ")
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join(" ")
        : null
    ),

  sobrenome: z
    .string()
    .transform(transformToNull)
    .refine((name) => {
      if (name !== null && name !== undefined) {
        return name.trim().length >= 3;
      }
      return true;
    }, { message: "Sobrenome deve ter no mínimo 3 caracteres" })
    .transform((name) =>
      name
        ? name
            .trim()
            .split(" ")
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join(" ")
        : null
    ),

  username: z
    .string()
    .transform(transformToNull)
    .refine((value) => {
      if (value !== null && value !== undefined) {
        const trimmedValue = value.trim();
        return trimmedValue.length >= 3 && trimmedValue.length <= 20 && /^[a-zA-Z0-9_-]+$/.test(trimmedValue);
      }
      return true;
    }, { message: `O nome de usuário deve ter entre 3 e 20 caracteres e conter apenas letras, números, hífens e sublinhados` }),

  telefone: z
    .string()
    .transform(transformToNull)
    .refine((value) => (value ? /^\d{11}$/.test(value) : true), {
      message: "Por favor, forneça um número de celular brasileiro válido com 11 dígitos.",
    })
    .transform((value) => (value ? `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}` : null)),

  senha: z.string(),

  senha2: z
    .string()
    .transform(transformToNull)
    .refine((value) => (value ? value.length >= 6 : true), "A nova senha precisa ter no mínimo 6 caracteres"),
});
