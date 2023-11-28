import { z } from "zod";

export const recuperarsenhaSchema = z.object({
    username: z.string().min(1, {message: "Preencha todos os campos"}),
    secretWords1: z.string().min(1, {message: "Preencha todos os campos"}),
    secretWords2: z.string().min(1, {message: "Preencha todos os campos"}),
    secretWords3: z.string().min(1, {message: "Preencha todos os campos"}),
    secretWords4: z.string().min(1, {message: "Preencha todos os campos"}),
    senha: z.string().min(6, {message:"A senha precisa ter no minímo 6 caracteres"} ),
    senha2: z.string().min(6, {message:"A senha precisa ter no minímo 6 caracteres"}),
  })
  .refine((data) => data.senha === data.senha2, {
    message: "As senhas não correspondem",
    path: ["senha2"],
  });