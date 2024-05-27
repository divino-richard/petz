"use server";

import { getUserById, updateUser } from "../data/users";
import { getSession } from "./auth";
import { revalidatePath } from "next/cache";
import { updateProfileSchema } from "../schema/user.schema";
import { uploadPublicFile } from "@/utils/upload.utils";

export async function updateProfile(_currentState: any, formData: FormData) {
  try {
    const user = await getSession();
    const data = updateProfileSchema.parse({
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      username: formData.get('username') as string,
      bio: formData.get('bio') as string,
    });
    let avatarUrl;

    const avatar = formData.get('avatar') as File | null;
    const uploadResult = await uploadPublicFile(avatar);
    if(uploadResult) {
      avatarUrl = uploadResult.url;
    }

    const update = await updateUser(user?.id ?? '', { 
      ...data,
      avatar: avatarUrl
    });

    if(!update) return {
      message: 'Failed to update profile'
    };
    
    revalidatePath(`/account`);
    return {
      success: true
    }
  } catch (error) {
    throw error;
  }
}

export async function getUserProfile() {
  const session = await getSession();
  if(!session) return null;
  return await getUserById(session?.id);
}