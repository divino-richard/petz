"use server";

import { updateUser } from "../data/users";
import { revalidatePath } from "next/cache";
import { updateProfileSchema } from "../schema/user.schema";
import { uploadPublicFile } from "@/utils/upload.utils";
import { auth } from "@/auth";

export async function updateProfile(_currentState: any, formData: FormData) {
  try {
    const session = await auth();
    if(!session) return null;
    const { user } = session;

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
