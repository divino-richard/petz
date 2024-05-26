"use server";

import { put } from "@vercel/blob";
import { getUserById, updateUser } from "../data/users";
import { getSession } from "./auth";
import { revalidatePath } from "next/cache";
import { updateProfileSchema } from "../schema/user.schema";

export async function updateProfile(_currentState: any, formData: FormData) {
  try {
    const user = await getSession();
    const data = updateProfileSchema.parse({
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      username: formData.get('username') as string,
      bio: formData.get('bio') as string,
    });

    const avatar = formData.get('avatar') as File | null;
    let avatarUrl;
    if(avatar && avatar instanceof File && avatar.size > 0 && avatar.name) {
      const { url } = await put(avatar.name, avatar, { 
        access: 'public', 
        token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN 
      });
      avatarUrl = url;
    }

    const update = await updateUser(user?.id ?? '', { 
      ...data,
      avatar: avatarUrl ?? undefined
    });

    if(!update) return {
      message: 'Failed to update profile'
    };
    
    revalidatePath(`/account`);
    return {
      success: true
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserProfile() {
  const session = await getSession();
  if(!session) return null;
  return await getUserById(session?.id);
}