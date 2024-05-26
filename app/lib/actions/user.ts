import prisma from "@/prisma/db";
import { User } from "@prisma/client";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function updateProfile(_currentState: unknown, formData: FormData) {
  try {
    const data = {
      avatar: formData.get('avatar'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      username: formData.get('username'),
      bio: formData.get('bio')
    }
    const avatar: File | null = data.avatar as File;
    const bytes = await avatar.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = join('/', 'uploads', avatar.name)
    await writeFile(path, buffer);
  } catch (error) {
    throw error;
  }
}