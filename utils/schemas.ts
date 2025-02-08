import { z } from 'zod';

export const messageSchema = z.object({
    message: z.string({
        message: "Por favor, ingrese un mensaje",
    }).min(1, { message: "El mensaje no puede estar vacío" }),
});

export type TMessageSchema = z.infer<typeof messageSchema>;