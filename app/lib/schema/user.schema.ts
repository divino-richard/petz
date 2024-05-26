import { z } from "zod";

export const updateProfileSchema = z  .object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  bio: z.string()
})