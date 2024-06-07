import { z } from "zod";

export const createPetPostSchema = z.object({
  petId: z.string(),
  caption: z.string().min(1)
});