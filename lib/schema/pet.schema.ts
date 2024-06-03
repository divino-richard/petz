import { z } from "zod";

export const registerPetSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number().min(1),
  color: z.string(),
  breed: z.string(),
  weight: z.number(),
  adoptationDate: z.string(),
  ability: z.string(),
  categoryId: z.string()
});