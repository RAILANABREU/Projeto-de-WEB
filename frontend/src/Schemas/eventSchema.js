import { z } from "zod";

export const createEventSchema = z.object({
    titulo: z.string().min(1, {message: "Preencha todos os campos"}).max(24, {message: "Pode conter no máximo 24 caracteres"}),
    descricao: z.string().min(1, {message: "Preencha todos os campos"}).max(300, {message: "Pode conter no máximo 300 caracteres"}),
    pix: z.string().min(1, {message: "Preencha todos os campos"})
})

export const editEventSchema = z.object({
    titulo: z.string().max(24, {message: "Pode conter no máximo 24 caracteres"}),
    descricao: z.string().max(300, {message: "Pode conter no máximo 300 caracteres"}),
    pix: z.string()
})