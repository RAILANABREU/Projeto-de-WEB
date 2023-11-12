import { z } from "zod";

export const signupSchema = z
  .object({
    nome: z
      .string()
      .min(3, { message: "Nome deve ter no mínimo 3 caracteres" })
      .transform((name) =>
        name
          .trim()
          .split(" ")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" ")
      ),
    sobrenome: z
    .string()
    .min(3, { message: "Sobrenome deve ter no mínimo 3 caracteres" })
    .transform((name) =>
      name
        .trim()
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ")
    ),
    username: z
    .string()
    .min(3, { message: "O nome de usuário deve ter no mínimo 3 caracteres" })
    .max(20, { message: "O nome de usuário deve ter no máximo 20 caracteres" })
    .regex(/^[a-zA-Z0-9_-]+$/, {
        message: "O nome de usuário deve conter apenas letras, números, hífens e sublinhados",
    }),
    telefone: z
    .string()
    .refine((value) => /^\d{11}$/.test(value), {
      message: "Por favor, forneça um número de celular brasileiro válido com 11 dígitos.",
    })
    .transform((value) => `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`),

    senha: z.string().min(6, "A senha precisa ter no minímo 6 caracteres"),
    senha2: z.string().min(6, "A senha precisa ter no minímo 6 caracteres"),
  })
  .refine((data) => data.senha === data.senha2, {
    message: "As senhas não correspondem",
    path: ["senha2"],
  });