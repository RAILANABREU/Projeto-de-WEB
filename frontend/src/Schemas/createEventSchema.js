import { z } from "zod";

export const createEventSchema = z.object({
    titulo: z.string().min(1, {message: "Preencha todos os campos"}),
    descricao: z.string(),
    pix: z.string()
})