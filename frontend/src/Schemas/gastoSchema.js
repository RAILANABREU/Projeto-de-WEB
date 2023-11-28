import { z } from "zod";

export const gastoSchema = z.object({
    local: z.string().min(1, {message: "Preencha todos os campos"}),
    descricao: z.string().min(1, {message: "Preencha todos os campos"}),
    valor: z.string().regex(/^\d+(\.\d{1,2})?$|^\d+(,\d{1,2})?$/, { message: "Digite um valor numérico válido" }).min(1, { message: "Preencha todos os campos" }),
})