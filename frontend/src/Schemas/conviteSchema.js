import { z } from "zod";

export const conviteSchema = z.object({
    convidado: z.string().min(1, {message: "Preencha o campo"})
})