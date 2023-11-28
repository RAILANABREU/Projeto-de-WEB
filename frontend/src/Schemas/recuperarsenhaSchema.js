import { z } from "zod";

export const recuperarsenhaSchema = z.object({
    username: z.string().min(1, {message: "Preencha todos os campos"}),
    secretWords1: z.string().min(1, {message: "Preencha todos os campos"}),
    secretWords2: z.string().min(1, {message: "Preencha todos os campos"}),
    secretWords3: z.string().min(1, {message: "Preencha todos os campos"}),
    secretWords4: z.string().min(1, {message: "Preencha todos os campos"})
})