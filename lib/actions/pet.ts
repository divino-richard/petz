"use server";

import { ZodError } from "zod";
import { createPet, updatePetById } from "../data/pet";
import { registerPetSchema } from "../schema/pet.schema";
import { uploadPublicFile } from "@/utils/upload.utils";
import { revalidatePath } from "next/cache";
import { getSession } from "../data/auth";

export async function registerPet(_currentState: any, formData: FormData) {
  try {
    const petOwner = await getSession();
    const data = registerPetSchema.parse({
      name: formData.get('name'),
      age: Number(formData.get('age')),
      color: formData.get('color'),
      breed: formData.get('breed'),
      weight: Number(formData.get('weight')),
      adoptationDate: formData.get('adoptationDate'),
      ability: formData.get('ability'),
      categoryId: formData.get('category')
    });
    let avatarUrl;

    const avatar = formData.get('avatar') as File | null;
    const uploadResult = await uploadPublicFile(avatar);
    if(uploadResult) {
      avatarUrl = uploadResult.url;
    }

    const pet = await createPet({ 
      ownerId: petOwner?.id ?? '',
      ...data, 
      adoptationDate: new Date(data.adoptationDate),
      avatar: avatarUrl
    });

    if(!pet) return {
      error: 'Failed to register pet'
    };

    revalidatePath('/account');

    return {
      success: true
    }

  } catch(error) {
    if(error instanceof ZodError) {
      const firstError = error.errors[0];
      return {
        error: firstError.path + " is " + firstError.message.toLocaleLowerCase()
      }
    }
    throw error;
  }
}


export async function updatePetProfile(_currentState: any, formData: FormData) {
  try {
    let avatarUrl;
    const avatar = formData.get('avatar') as File | null;
    const uploadResult = await uploadPublicFile(avatar);

    const data = registerPetSchema.parse({
      id: formData.get('id'),
      name: formData.get('name'),
      age: Number(formData.get('age')),
      color: formData.get('color'),
      breed: formData.get('breed'),
      weight: Number(formData.get('weight')),
      adoptationDate: formData.get('adoptationDate'),
      ability: formData.get('ability'),
      categoryId: formData.get('category')
    });

    if(uploadResult) {
      avatarUrl = uploadResult.url;
    }

    const update = await updatePetById(data.id, {
      ...data,
      adoptationDate: new Date(data.adoptationDate),
      avatar: avatarUrl
    });

    if(!update) return {
      error: 'Failed to update pet'
    }

    revalidatePath('/pet/[id]');

    return {
      success: true
    }

  } catch (error) {
    if(error instanceof ZodError) {
      const firstError = error.errors[0];
      return {
        error: firstError.path + " is " + firstError.message.toLocaleLowerCase()
      }
    }
    throw error;
  }
}