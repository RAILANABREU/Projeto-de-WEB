import { z } from "zod";

export const signinSchema = z.object({
    username: z.string().min(1, {message: "Preencha todos os campos"}),
    senha: z.string().min(1, {message: "Preencha todos os campos"})
})