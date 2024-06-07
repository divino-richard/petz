import { z } from "zod";

export const createPetPostSchema = z.object({
  petId: z.string(),
  caption: z.string().min(1)
});

export const updatePetPostSchema = z.object({
  postId: z.string(),
  caption: z.string()
});
